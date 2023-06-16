import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

import App from '@/App.vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

/* TODO:
https://github.com/patmood/pocketbase-typegen
https://github.com/unjs/unhead
https://github.com/posva/unplugin-vue-router
https://github.com/antfu/unplugin-vue-components
https://github.com/unjs/unimport / https://github.com/antfu/unplugin-auto-import
https://github.com/antfu/vitesse
https://github.com/antfu/vite-ssg / https://nuxt.com/docs/getting-started/deployment#static-hosting
https://vueuse.org/
https://zod.dev/
https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
*/
