import { defineConfig } from 'vite'
import nunjucks from 'nunjucks'
import path from 'path'
import { fileURLToPath } from 'url'
import { states, packages } from './src/data/siteData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* ──────────────────────────────────────────
   Custom Vite Plugin: Nunjucks
   Processes every HTML entry with Nunjucks
   before Vite's own HTML pipeline runs.
────────────────────────────────────────── */
function vitePluginNunjucks(options = {}) {
  const templatesDir = path.resolve(__dirname, options.templatesDir || 'src/templates')

  return {
    name: 'vite-plugin-nunjucks',

    // Run BEFORE Vite's HTML processing
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        // Configure Nunjucks to resolve includes/extends from templatesDir
        const env = nunjucks.configure(templatesDir, {
          autoescape: false,
          trimBlocks: true,
          lstripBlocks: true,
          noCache: true,
        })

        // Merge per-page variables (from html comment block) with global vars
        const globalVars = options.variables || {}
        return env.renderString(html, globalVars)
      },
    },
  }
}

/* ──────────────────────────────────────────
   Vite Configuration
────────────────────────────────────────── */
export default defineConfig({
  root: 'src',

  plugins: [
    vitePluginNunjucks({
      templatesDir: 'src/templates',
      variables: { states, packages },
    }),
  ],

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index:   path.resolve(__dirname, 'src/index.html'),
        about:   path.resolve(__dirname, 'src/about.html'),
        contact: path.resolve(__dirname, 'src/contact.html'),
      },
    },
  },
})
