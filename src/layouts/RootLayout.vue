<script setup lang="ts">
import type { VThemeProvider } from 'vuetify/components'

import { usePreferredColorScheme } from '@vueuse/core'
import { ref, computed } from 'vue'

const preferredColor = usePreferredColorScheme()
const theme = computed(() => (preferredColor.value === 'dark' ? 'dark' : 'light'))

const navigationDrawerListItems = [
  {
    title: '庫存',
    link: true,
    props: {
      to: { name: 'root.stocks' },
      prependIcon: 'mdi-chart-line',
    },
  },
  {
    title: '推薦',
    link: true,
    props: {
      to: { name: 'root.advices' },
      prependIcon: 'mdi-file-chart-check',
    },
  },
]

const navigationDrawer = ref({
  listItems: navigationDrawerListItems,
  open: true,
})
</script>

<template>
  <VThemeProvider :theme="theme">
    <VApp>
      <VAppBar color="primary">
        <template #prepend>
          <VAppBarNavIcon @click="navigationDrawer.open = !navigationDrawer.open" />
        </template>
        <VAppBarTitle>群益跟單</VAppBarTitle>
        <!-- <template #append>
          <VBtn icon="mdi-dots-vertical" />
        </template> -->
      </VAppBar>
      <VNavigationDrawer v-model="navigationDrawer.open" permanent>
        <VList :items="navigationDrawer.listItems" />
      </VNavigationDrawer>
      <VMain>
        <RouterView />
      </VMain>
    </VApp>
  </VThemeProvider>
</template>
