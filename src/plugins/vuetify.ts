import { createVuetify } from 'vuetify'
// import { md3 } from 'vuetify/blueprints'

const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default createVuetify({
  // blueprint: md3,
  theme: {
    defaultTheme,
    themes: {
      light: {
        colors: {
          //
        },
      },
      dark: {
        colors: {
          //
        },
      },
    },
  },
})
