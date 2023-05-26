import type { App } from 'vue'

import { loadFonts } from '@/fonts'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import pinia from '@/stores'
import '@/styles'

export function registerPlugins(app: App) {
  loadFonts()
  app.use(vuetify).use(router).use(pinia)
}
