import { fileURLToPath, URL } from 'node:url'

import yamlPlugin from '@modyfi/vite-plugin-yaml'
import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetifyPlugin, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vuePlugin({
      template: { transformAssetUrls },
    }),
    vuetifyPlugin({
      autoImport: true,
      styles: { configFile: 'src/styles/vuetify.scss' },
    }),
    yamlPlugin(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
})
