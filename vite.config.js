import { defineConfig } from 'vite';
import injectHtml from 'vite-plugin-html-inject';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import path from 'path';

// --- CUSTOM PLUGIN START ---
// Ye plugin HTML me <icon> tag dhoondh kar usse SVG code se replace karega
const htmlIconPlugin = () => {
  return {
    name: 'html-icon-transform',
    transformIndexHtml(html) {
      // Regex jo <icon name="..." class="..." /> ko pakdega
      return html.replace(/<icon\s+name="([^"]+)"\s*(?:class="([^"]+)")?\s*\/?>/g, (match, iconName, className) => {
        try {
          // 1. Icon file ka path dhoondo
          const iconPath = path.resolve(__dirname, `src/icons/${iconName}.svg`);
          
          // 2. File read karo
          let svgContent = fs.readFileSync(iconPath, 'utf-8');

          // 3. Agar user ne class di hai, to SVG tag me inject karo
          if (className) {
            // SVG tag ke andar class add kar rahe hain
            svgContent = svgContent.replace('<svg', `<svg class="${className}"`);
          }

          // 4. Raw SVG return karo
          return svgContent;
        } catch (error) {
          console.error(`❌ Icon not found: ${iconName}`);
          return match; // Agar file nahi mili to waisa hi chhod do
        }
      });
    },
  };
};
// --- CUSTOM PLUGIN END ---

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        cssnano({ preset: 'default' }),
      ]
    }
  },

  plugins: [
    injectHtml(),
    htmlIconPlugin(), // ✅ Humara naya plugin yahan lagaya
  ],

  server: { open: true },
  
  build: {
    outDir: 'dist',
    cssMinify: 'esbuild',
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
    }
  }
});