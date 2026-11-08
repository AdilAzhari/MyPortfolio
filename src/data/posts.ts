export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'code'; lang: string; text: string }
  | { type: 'list'; items: string[] };

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  project: string;
  link: { label: string; href: string };
  tags: string[];
  body: Block[];
}

// Inline `code` in text blocks is rendered as <code>.
export const posts: Post[] = [
  {
    slug: 'idempotency-keys-per-user',
    title: 'An idempotency key is a promise, not a password',
    date: '2026-11-08',
    summary:
      "How laravel-idempotency stops a retried payment from charging twice, and why I changed it so one user can never be replayed another user's response.",
    project: 'laravel-idempotency',
    link: { label: 'View the package', href: 'https://github.com/AdilAzhariOmsan/laravel-idempotency' },
    tags: ['Laravel', 'APIs', 'Security'],
    body: [
      {
        type: 'p',
        text: 'A mobile app sends `POST /payments`. The server charges the card, but the response is lost on a flaky connection. The app retries, and the customer is charged twice. Retrying is the right thing for a client to do; the server just needs a way to recognise the second attempt.',
      },
      {
        type: 'p',
        text: 'That is what an `Idempotency-Key` header is for. The client generates a key per operation and sends it with every attempt. laravel-idempotency is middleware that runs the request once and replays the stored response for every retry:',
      },
      {
        type: 'code',
        lang: 'php',
        text: "Route::post('/payments', StorePaymentController::class)\n    ->middleware('idempotency');",
      },
      { type: 'h', text: 'Three things have to be right' },
      {
        type: 'list',
        items: [
          'Concurrency. Two attempts can arrive at the same moment, before either has stored a response. The middleware takes a lock on the key, then checks the store again after acquiring it, because the other attempt may have finished while this one waited. Only the request holding the lock runs the controller.',
          'Same key, different request. A client bug can reuse a key for a different body. Each request is fingerprinted with SHA-256; a stored record with a different fingerprint returns `409 Conflict` instead of replaying a response that belongs to another operation.',
          'Honest replays. A replayed response carries `Idempotency-Replayed: true`, so clients and logs can tell a replay from a fresh execution.',
        ],
      },
      { type: 'h', text: 'The hole: keys were global' },
      {
        type: 'p',
        text: "In v1.0 the client's key was the storage key. But keys are chosen by clients, and nothing stops two clients choosing the same one: a weak generator, a hard-coded value in a test build, or someone deliberately reusing a key they saw. If user B sent a request with user A's key and the same body, B was replayed A's stored response. The key was acting like a password it was never meant to be.",
      },
      { type: 'h', text: 'The fix: scope every key to its owner' },
      {
        type: 'p',
        text: "Keys are now stored in their owner's namespace. The default scope is the authenticated user, including the model class, so a `User` and an `Admin` that both have id 1 never share keys. The scope and the key are hashed together, which also keeps the storage key a fixed length however long the client's key is:",
      },
      {
        type: 'code',
        lang: 'php',
        text: "return 'scoped:'.hash('sha256', $scope.\"\\0\".$key->value);",
      },
      {
        type: 'p',
        text: 'The lock uses the same scoped key, so two different users who happen to send the same key no longer block each other either. For multi-tenant APIs, the scope is a small contract you can implement yourself:',
      },
      {
        type: 'code',
        lang: 'php',
        text: "final class TenantScopeResolver implements IdempotencyScopeResolver\n{\n    public function resolve(Request $request): ?string\n    {\n        return $request->header('X-Tenant-Id');\n    }\n}",
      },
      { type: 'h', text: 'The cost of changing a default' },
      {
        type: 'p',
        text: "Making scoping the default changes where existing records are found, so a retry that straddles the deploy runs once more. I decided that was the right trade for a security fix, documented it as a breaking change in the changelog, and kept `'scope' => null` as a one-line way back to v1.0 behaviour.",
      },
      { type: 'h', text: 'Takeaway' },
      {
        type: 'p',
        text: 'Anything a client chooses is input, even when it looks like an identifier. Treat it as unique only within the boundary you can actually verify: here, the authenticated user.',
      },
    ],
  },
  {
    slug: 'kilat-last-slot-race',
    title: 'Two customers, one last slot: booking without races in Laravel',
    date: '2026-11-08',
    summary:
      'How Kilat Car Wash keeps double taps, retries and two customers grabbing the same time slot from ever creating two bookings: row locks, a re-check, and a unique request id.',
    project: 'Kilat Car Wash',
    link: { label: 'See the project', href: 'https://adilomer.xyz/#projects' },
    tags: ['Laravel', 'Concurrency', 'Databases'],
    body: [
      {
        type: 'p',
        text: 'Kilat is a booking and operations app for a multi-branch car wash. Customers scan a QR code at the branch or book ahead, washers run the queue from a bay tablet, and owners watch every branch live. Car washes get busy at the same times, so the bugs that matter are concurrency bugs:',
      },
      {
        type: 'list',
        items: [
          'Two customers pick the last 10:30 slot in the same second.',
          'A customer on mobile data double-taps "Book", or the browser retries the request.',
          'Two washers tap the same car at once, or check two cars into the same bay.',
        ],
      },
      {
        type: 'p',
        text: 'Checking "is this slot free?" and then inserting does not survive any of these. Both requests run the check, both see a free slot, both insert.',
      },
      { type: 'h', text: 'Lock first, then check' },
      {
        type: 'p',
        text: 'Every write that takes a slot runs in a transaction that first locks the branch row. On MySQL that is a `SELECT ... FOR UPDATE`: a second booking for the same branch waits until the first commits, then runs its checks against the result.',
      },
      {
        type: 'code',
        lang: 'php',
        text: "DB::transaction(function () use ($branch, $plate, $scheduledAt, $duration) {\n    Branch::query()->whereKey($branch->id)->lockForUpdate()->first();\n\n    if ($branch->bookings()->active()->where('plate', $plate)->exists()) {\n        throw ValidationException::withMessages(['plate' => 'Already booked.']);\n    }\n\n    if (! $this->queue->isBookable($branch, $scheduledAt, $duration)) {\n        throw ValidationException::withMessages([\n            'time' => 'That time was just taken. Pick another one.',\n        ]);\n    }\n\n    // ...create the booking\n}, attempts: 3);",
      },
      {
        type: 'p',
        text: "The lock is per branch, not global, so a busy Cheras branch never slows down Puchong, and the second customer gets a clear message instead of a double booking. Status changes work the same way but lock the booking row: a car can only move along allowed transitions, it can't be handed over before it is marked paid, and checking a car into a bay locks the bay so two cars never share it.",
      },
      { type: 'h', text: 'Retries: a unique request id' },
      {
        type: 'p',
        text: 'Locks stop two different bookings from colliding, but a double tap is the same booking sent twice. Each booking form generates a UUID that is submitted with it and stored in a `request_id` column with a unique index. If two copies race, the database rejects the second insert and the app returns the booking the first copy created:',
      },
      {
        type: 'code',
        lang: 'php',
        text: "try {\n    $booking = DB::transaction(/* ... */);\n} catch (UniqueConstraintViolationException $e) {\n    // The same form was submitted twice at once and the other copy won.\n    if ($existing = Booking::where('request_id', $requestId)->first()) {\n        return $existing;\n    }\n\n    throw $e;\n}",
      },
      {
        type: 'p',
        text: 'The customer sees one booking, whichever request won. The one-time code is only spent once a booking actually succeeds, so a failed attempt never burns it.',
      },
      { type: 'h', text: 'Repeating a status change does nothing' },
      {
        type: 'p',
        text: 'Moving a booking to the status it already has is a no-op and sends no second WhatsApp message. A washer tapping "Ready" twice, or two supervisors confirming the same request, is harmless by design.',
      },
      { type: 'h', text: 'Takeaway' },
      {
        type: 'p',
        text: 'For anything that takes a scarce resource, check the rule inside the same transaction that holds the lock, and let a unique constraint, not application code, decide which duplicate wins. The database is the one place where both requests can see each other.',
      },
    ],
  },
  {
    slug: 'madarik-tenant-isolation',
    title: 'Keeping every school\'s data apart in a multi-tenant Laravel app',
    date: '2026-09-28',
    summary:
      'How Madarik scopes 30 models to the current school with one middleware and one trait, where that stops protecting you, and the test that proves it.',
    project: 'Madarik',
    link: { label: 'See the live demo', href: 'https://madarik.aljebal-albeedos.com' },
    tags: ['Laravel', 'Multi-Tenancy', 'Architecture'],
    body: [
      {
        type: 'p',
        text: 'Madarik is a school management platform: students, attendance, grades, fees, the library, messaging. Every school is a tenant, and they all live in one database. Each tenant-owned table carries a `school_id` column, which keeps one schema and one migration path. The cost is that isolation depends on every query remembering that column. With 30 tenant-owned models, "remember to add the where clause" is not a strategy.',
      },
      { type: 'h', text: 'Resolve the tenant once per request' },
      {
        type: 'p',
        text: 'A `ResolveSchool` middleware runs on both the web and API stacks. It takes the school from the authenticated user and binds it into the container. Super-admins can act on another school through an `X-School-Id` header, but only if they pass the `manage-platform` gate:',
      },
      {
        type: 'code',
        lang: 'php',
        text: `$schoolId = $user->school_id;

if (($override = $request->header('X-School-Id')) && Gate::allows('manage-platform')) {
    $schoolId = (int) $override;
}

app()->instance('school_id', $schoolId);`,
      },
      { type: 'h', text: 'Scope every tenant model with one trait' },
      {
        type: 'p',
        text: 'Tenant-owned models use a `BelongsToSchool` trait. It does two things: fills in `school_id` when a model is created, and adds a global scope that limits every query to the current school.',
      },
      {
        type: 'code',
        lang: 'php',
        text: `static::creating(function (Model $model): void {
    if (empty($model->school_id) && app()->bound('school_id')) {
        $model->school_id = resolve('school_id');
    }
});

static::addGlobalScope('school', function (Builder $builder): void {
    if (app()->bound('school_id') && resolve('school_id')) {
        $builder->where($builder->getModel()->getTable().'.school_id', resolve('school_id'));
    }
});`,
      },
      {
        type: 'p',
        text: 'Qualifying the column with the table name matters. Without it, a query that joins two tenant tables fails with an ambiguous `school_id` column.',
      },
      { type: 'h', text: 'The one model that can\'t use it' },
      {
        type: 'p',
        text: '`User` deliberately does not use the trait. The user is what resolves the tenant, so scoping users by the tenant would be circular: authentication would need the school before it knows who is asking. Queries on users are scoped by hand instead, for example when choosing who receives an announcement:',
      },
      {
        type: 'code',
        lang: 'php',
        text: `$base = User::query()->where('school_id', $a->school_id);

return match ($a->audience) {
    'all' => $base,
    'teachers' => $base->role('teacher'),
    'parents' => $base->role('parent'),
    // ...
};`,
      },
      {
        type: 'p',
        text: 'Those recipients are then notified with `chunkById(200)`, so a large school never loads every user into memory at once. Push notifications are batched 500 tokens per request, the most FCM accepts.',
      },
      { type: 'h', text: 'Suspending a whole tenant' },
      {
        type: 'p',
        text: 'A second middleware, `CheckSchoolStatus`, runs right after the resolver. If the school is suspended, API requests get a 403 with the reason, and browser sessions are logged out and invalidated. Platform staff are exempt so they can still get in and fix things.',
      },
      { type: 'h', text: 'Where this stops protecting you' },
      {
        type: 'p',
        text: 'The scope only applies when `school_id` is bound, and only the middleware binds it. Artisan commands, scheduled tasks and queued jobs run without it, so there every tenant query is unscoped. That is intentional, because platform-wide jobs need to see every school, but it means any code outside a request has to set or filter the school explicitly.',
      },
      { type: 'h', text: 'Testing the property, not the code' },
      {
        type: 'p',
        text: 'The suite had over a hundred Pest tests, but every one of them bound `school_id` by hand, and none created two schools to prove one can\'t read the other\'s data. The scope made a leak unlikely; it didn\'t make it tested. So I added a test that finds every model using `BelongsToSchool` by reflection, seeds one row per school, and asserts only the current school\'s row comes back:',
      },
      {
        type: 'code',
        lang: 'php',
        text: `it('scopes queries to the current school', function (string $model): void {
    $mine = $model::factory()->create(['school_id' => $this->schoolA->id]);
    $theirs = $model::factory()->create(['school_id' => $this->schoolB->id]);

    app()->instance('school_id', $this->schoolA->id);

    $ids = $model::query()->pluck('id');
    expect($ids)->toContain($mine->getKey())
        ->and($ids)->not->toContain($theirs->getKey());
})->with(tenantModelsWithFactories());`,
      },
      {
        type: 'p',
        text: 'Because the models are discovered, a new tenant model is covered as soon as it has a factory. A second set of tests goes through HTTP and the real middleware: listing students, fetching another school\'s student by id, and the `X-School-Id` header, which must be ignored for regular admins and honoured for super-admins.',
      },
      {
        type: 'p',
        text: 'To check the tests could actually fail, I disabled the scope and reran them: 22 of 26 failed. The four that still passed were informative too. Fetching another school\'s student by id stayed blocked, because the policy compares `school_id` on its own. That second layer is exactly what you want when one of them slips.',
      },
      { type: 'h', text: 'Takeaway' },
      {
        type: 'p',
        text: 'Put tenant isolation somewhere nobody has to remember it, a scope rather than a where clause, and write down the places the scope deliberately doesn\'t reach. Then test the property you actually care about: that tenant B\'s data is invisible to tenant A.',
      },
    ],
  },
  {
    slug: 'horizon-delayed-until',
    title: 'Why Horizon showed "Delayed Until" equal to "Pushed"',
    date: '2026-09-15',
    summary:
      'A delayed job looked like it had no delay at all. The cause was two libraries using the letter "m" for different units.',
    project: 'laravel/horizon',
    link: { label: 'Read the pull request', href: 'https://github.com/laravel/horizon/pull/1819' },
    tags: ['Laravel', 'Queues', 'JavaScript'],
    body: [
      {
        type: 'p',
        text: 'Horizon\'s job detail screen shows a "Delayed Until" time for delayed jobs. Issue #1668 reported that for some jobs it showed exactly the same time as "Pushed", as if the delay had never been applied, even though the job did run late.',
      },
      {
        type: 'p',
        text: 'The jobs in the report were dispatched the way the Laravel docs suggest when you think in minutes rather than seconds:',
      },
      {
        type: 'code',
        lang: 'php',
        text: 'CheckForNewTenantFiles::dispatch($tenant)\n    ->delay(CarbonInterval::minutes(10));',
      },
      { type: 'h', text: 'Narrowing it down' },
      {
        type: 'p',
        text: 'A delay can reach the queue in three shapes: an integer number of seconds, a `DateTimeInterface`, or a `DateInterval`. Integers and dates rendered correctly. Only intervals were wrong, so the bug had to be in how the dashboard read the serialized interval.',
      },
      {
        type: 'p',
        text: 'PHP serializes a `DateInterval` with its own field names: `y`, `m`, `d`, `h`, `i`, `s`. Minutes are `i`, and `m` is months. The dashboard passed that object straight into moment:',
      },
      {
        type: 'code',
        lang: 'js',
        text: "this.formatDate(this.job.payload.pushedAt).add(unserialized.delay, 'seconds')",
      },
      {
        type: 'p',
        text: "When `add()` receives an object, moment ignores the unit argument and reads the object's keys with its own shorthand, where `m` means minutes and `i` means nothing. For a 10-minute delay, `i: 10` was silently dropped and `m: 0` was read as zero minutes. Nothing was added, so the two timestamps matched. The same mix-up also turned a two-month delay into two minutes.",
      },
      { type: 'h', text: 'The fix' },
      {
        type: 'p',
        text: "Rather than special-casing minutes, I mapped every interval field explicitly to moment's fully spelled-out keys, which removes the ambiguity for every unit combination:",
      },
      {
        type: 'code',
        lang: 'js',
        text: 'this.formatDate(this.job.payload.pushedAt).add({\n    years: delay.y,\n    months: delay.m,\n    days: delay.d,\n    hours: delay.h,\n    minutes: delay.i,\n    seconds: delay.s,\n})',
      },
      {
        type: 'p',
        text: 'The same logic existed in both the job detail view and the recent-jobs row, so I fixed both and kept the integer and date branches unchanged. Taylor Otwell merged it into Horizon.',
      },
      { type: 'h', text: 'Takeaway' },
      {
        type: 'p',
        text: 'When data crosses a boundary (here PHP serialization into a JavaScript date library), check what each side means by a key before handing the object over. Two formats can look compatible and still disagree on a single letter.',
      },
    ],
  },
  {
    slug: 'debugbar-validation-errors-cut',
    title: 'Getting validation errors back into the Debugbar session panel',
    date: '2026-09-06',
    summary:
      'Validation messages showed up as "_cut" because of a dumper depth limit. A pair of casters removed one level of nesting.',
    project: 'laravel-debugbar',
    link: { label: 'Read the pull request', href: 'https://github.com/fruitcake/laravel-debugbar/pull/2085' },
    tags: ['Laravel', 'Debugging', 'PHP'],
    body: [
      {
        type: 'p',
        text: 'Issue #2036 showed the Debugbar session panel displaying validation errors as `"_cut"` instead of the actual messages, which is exactly the information you open that panel to find.',
      },
      { type: 'h', text: 'Where the depth went' },
      {
        type: 'p',
        text: "`SessionCollector` formats session values through the data formatter, which uses Symfony's VarCloner with a depth limit of 3 for non-iterable objects. A `ViewErrorBag` needs four levels to reach its strings:",
      },
      {
        type: 'code',
        lang: 'text',
        text: 'ViewErrorBag -> bags array -> MessageBag object -> messages array -> the strings',
      },
      {
        type: 'p',
        text: 'The `MessageBag` object uses up a whole level on its own, so the messages array appeared but everything inside it was replaced with `"_cut"`.',
      },
      { type: 'h', text: 'The fix' },
      {
        type: 'p',
        text: 'The maintainer had suggested a custom caster in the issue. I registered two, next to the existing ones in `registerDataFormatter()`. They convert both bag types to plain arrays while cloning:',
      },
      {
        type: 'code',
        lang: 'php',
        text: 'ViewErrorBag::class => static fn (ViewErrorBag $bag, array $a, Stub $stub): array =>\n    array_map(fn (MessageBag $b): array => $b->toArray(), $bag->getBags()),\nMessageBag::class => static fn (MessageBag $bag, array $a, Stub $stub): array =>\n    $bag->toArray(),',
      },
      {
        type: 'p',
        text: 'The trade-off, which I stated in the PR: the dump loses the "MessageBag" class label and its `format` property, but you can read the messages. For what is essentially a list of strings, that is the right trade.',
      },
      { type: 'h', text: 'Testing' },
      {
        type: 'list',
        items: [
          'A test for the exact shape from the issue, plus a bare MessageBag, multiple named bags (the $errors->getBag(\'login\') pattern) and the empty bag every view receives.',
          'I reverted the caster locally and watched the tests fail with the same "_cut" output from the issue, so they actually catch the bug.',
          'I left the more general "deep objects get cut" problem out of scope and said so, which kept the change small enough to review quickly.',
        ],
      },
      { type: 'p', text: 'Barry vd. Heuvel merged it the same day.' },
    ],
  },
  {
    slug: 'grav-env-boolean-overrides',
    title: 'When GRAV_CONFIG__…=false means true',
    date: '2026-09-02',
    summary:
      'Environment variables are always strings, and (bool)"false" is true in PHP. A small cast fixed a config override that did the opposite of what it said.',
    project: 'Grav CMS',
    link: { label: 'Read the pull request', href: 'https://github.com/getgrav/grav/pull/4278' },
    tags: ['PHP', 'Configuration'],
    body: [
      {
        type: 'p',
        text: 'Grav lets you override any config key with an environment variable such as `GRAV_CONFIG__system__cache__enabled=false`. Issue #4277 reported that this setting left the cache on.',
      },
      { type: 'h', text: 'Root cause' },
      {
        type: 'p',
        text: 'Environment variables are always strings, so the config received the string `"false"`. Core reads flags like this with a `(bool)` cast, and in PHP any non-empty string other than `"0"` is true. The override did the opposite of what it said, and nothing in the logs hinted at it.',
      },
      { type: 'h', text: 'The fix' },
      {
        type: 'p',
        text: 'The env override loop in `initializeConfig()` now passes each value through a small helper before it is stored:',
      },
      {
        type: 'code',
        lang: 'php',
        text: "protected static function castEnvironmentValue(mixed $value): mixed\n{\n    if (is_string($value)) {\n        if (strcasecmp($value, 'true') === 0) {\n            return true;\n        }\n        if (strcasecmp($value, 'false') === 0) {\n            return false;\n        }\n    }\n\n    return $value;\n}",
      },
      {
        type: 'p',
        text: 'The key decision was what not to convert. `"0"`, `"1"`, numbers, `"yes"` and padded strings like `" true "` pass through unchanged, so existing setups behave exactly as before. Only the two unambiguous literals are converted.',
      },
      {
        type: 'p',
        text: 'The tests follow the reflection plus data provider pattern the file already used, with 16 cases that document both what is converted and what is deliberately left alone. It was merged into the develop branch.',
      },
    ],
  },
];
