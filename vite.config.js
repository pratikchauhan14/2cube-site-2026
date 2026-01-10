import { defineConfig } from 'vite';
import injectHtml from 'vite-plugin-html-inject';
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    injectHtml(), // HTML Components jodta hai
    
    // Images ko automatic compress karega (png, jpeg, svg)
    // ViteImageOptimizer({
    //   png: { quality: 80 },
    //   jpeg: { quality: 75 },
    //   webp: { quality: 80 },
    //   svg: {
    //     plugins: [
    //       { name: 'removeViewBox', active: false },
    //       { name: 'removeDimensions', active: true },
    //     ],
    //   },
    // }),
  ],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'terser', // 'esbuild' se thoda slow hai par size chhota karta hai
    terserOptions: {
      compress: {
        drop_console: true, // Production me console.log hata dega
        drop_debugger: true,
      },
    },
    cssMinify: 'lightningcss', // CSS ko fast aur better compress karega
    rollupOptions: {
      input: {
        main: 'index.html',
        marketplace: 'marketplace.html',
        opensource: 'opensource.html',
        'migrations-integrity': 'migrations-integrity.html',
        'custom-dev': 'custom-dev.html',
        story: 'story.html',
        blog: 'blog.html',
        'blog-inner': 'blog-inner.html',
        'blog-author': 'blog-author.html',
        '404': '404.html',
        roadmap: 'roadmap.html',
        'case-study': 'case-study.html',
        'case-study-inner': 'case-study-inner.html',
      },
      output: {
        // JS files ko alag-alag tukdo me todega (Better Caching)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Library code alag file me jayega
          }
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.svg') && assetInfo.name.includes('remixicon')) {
             // RemixIcon SVG ko alag folder me fek do ya ignore karo (Technically hum rok nahi sakte without plugin, 
             // par modern browsers woff2 hi uthayenge, so 2.8MB file download nahi hogi user ke liye).
             return 'assets/icons/[name]-[hash][extname]'; 
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
    },
  },
});