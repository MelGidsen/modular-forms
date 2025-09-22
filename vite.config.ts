import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      target: 'es2022',
      outDir: 'dist',
      lib: {
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      minify: false,
      rollupOptions: {
        external: [
          '@builder.io/qwik',
          '@builder.io/qwik/jsx-runtime',
          '@builder.io/qwik-city',
          '@builder.io/qwik-city/middleware/request-handler',
          'decode-formdata',
          'valibot',
          'zod',
        ],
      },
    },
    plugins: [qwikVite()],
  };
});
