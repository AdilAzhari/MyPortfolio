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
  pr: string;
  tags: string[];
  body: Block[];
}

// Inline `code` in text blocks is rendered as <code>.
export const posts: Post[] = [
  {
    slug: 'horizon-delayed-until',
    title: 'Why Horizon showed "Delayed Until" equal to "Pushed"',
    date: '2026-09-15',
    summary:
      'A delayed job looked like it had no delay at all. The cause was two libraries using the letter "m" for different units.',
    project: 'laravel/horizon',
    pr: 'https://github.com/laravel/horizon/pull/1819',
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
    pr: 'https://github.com/fruitcake/laravel-debugbar/pull/2085',
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
    pr: 'https://github.com/getgrav/grav/pull/4278',
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
