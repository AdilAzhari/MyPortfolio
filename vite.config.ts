import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// The app is written against the React API but runs on Preact (preact/compat), which is ~120 KB
// lighter. These aliases apply to both builds, so the prerendered HTML and the hydrating client
// come from the same renderer. Order matters: the more specific react-dom/* entries come first.
const reactToPreact = [
  { find: /^react-dom\/client$/, replacement: 'preact/compat/client' },
  { find: /^react-dom\/server$/, replacement: 'preact/compat/server' },
  { find: /^react-dom$/, replacement: 'preact/compat' },
  { find: /^react\/jsx-runtime$/, replacement: 'preact/jsx-runtime' },
  { find: /^react\/jsx-dev-runtime$/, replacement: 'preact/jsx-dev-runtime' },
  { find: /^react$/, replacement: 'preact/compat' },
];

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [preact({ prerender: { enabled: false } })],
  resolve: {
    alias: reactToPreact,
  },
  ssr: {
    // Bundle packages that import "react" into the SSR build, so the aliases above apply to
    // them too; left external, Node would resolve a React that is no longer installed.
    noExternal: ['lucide-react', '@vercel/analytics', '@vercel/speed-insights'],
  },
  optimizeDeps: {
    include: ['preact', 'preact/compat', 'lucide-react'],
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // The SSR build (used only for prerendering) needs no vendor chunks.
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              // Split vendor chunks for better caching
              vendor: ['preact', 'preact/compat', 'preact/hooks'],
              icons: ['lucide-react'],
            },
          },
        },
    // Enable CSS code splitting
    cssCodeSplit: true,
    sourcemap: false,
  },
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
}));
