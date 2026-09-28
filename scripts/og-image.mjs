// Renders a 1200x630 social preview PNG for a post, in the same style as public/og-image.png.
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const require = createRequire(import.meta.url);
const font = (weight) => readFile(require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`));

const fonts = await Promise.all(
  [400, 500, 800].map(async (weight) => ({ name: 'Inter', data: await font(weight), weight, style: 'normal' })),
);

// satori takes a React-like element tree; plain objects avoid needing JSX in a .mjs file.
// Satori requires an explicit display on any element with several children, so default every box to flex.
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.length === 1 ? children[0] : children },
});

const colors = { bg: '#0f172a', heading: '#e2e8f0', body: '#94a3b8', accent: '#5eead4', chip: 'rgba(45,212,191,0.1)' };

export const renderPostImage = async ({ title, summary, project, date, site }) => {
  const svg = await satori(
    h(
      'div',
      { width: '100%', height: '100%', display: 'flex', backgroundColor: colors.bg, fontFamily: 'Inter' },
      h('div', { width: 10, height: '100%', backgroundColor: '#2dd4bf' }),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 88px', flex: 1 },
        h(
          'div',
          { display: 'flex', flexDirection: 'column' },
          h('div', { fontSize: 26, fontWeight: 500, color: colors.accent, letterSpacing: 2 }, 'WRITING'),
          h('div', { marginTop: 22, fontSize: title.length > 60 ? 54 : 62, fontWeight: 800, color: colors.heading, lineHeight: 1.1, letterSpacing: -1.5 }, title),
          h('div', { marginTop: 26, fontSize: 28, color: colors.body, lineHeight: 1.4 }, summary),
        ),
        h(
          'div',
          { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
          h('div', { display: 'flex', fontSize: 24, fontWeight: 500, color: colors.accent, backgroundColor: colors.chip, borderRadius: 999, padding: '10px 24px' }, `${project} · ${date}`),
          h('div', { fontSize: 28, fontWeight: 800, color: colors.accent }, site),
        ),
      ),
    ),
    { width: 1200, height: 630, fonts },
  );
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
};
