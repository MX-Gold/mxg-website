import type { UnsubscribeFunc } from 'pocketbase'

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { userPayloadToRecord, type UserPayload, type UserRecord } from '@/records/user'
import services from '@/services'

export const useUserStore = defineStore('user', () => {
  const userPayloads = ref([] as UserPayload[])
  const userRecords = computed<UserRecord[]>(() => {
    return userPayloads.value.map(userPayloadToRecord)
  })

  async function subscribe(): Promise<UnsubscribeFunc> {
    const unsubscribeFunction = await services.user.subscribe('*', (subscription) => {
      const { action } = subscription
      const payload = subscription.record as unknown as UserPayload
      if (action === 'create') {
        userPayloads.value.push(payload)
      } else if (action === 'update') {
        const userPayloadIndex = userPayloads.value.findIndex(
          (userPayload) => userPayload.id === payload.id,
        )
        if (userPayloadIndex >= 0) {
          userPayloads.value[userPayloadIndex] = payload
        } else {
          userPayloads.value.push(payload)
        }
      } else if (action === 'delete') {
        const userPayloadIndex = userPayloads.value.findIndex(
          (userPayload) => userPayload.id === payload.id,
        )
        if (userPayloadIndex >= 0) {
          userPayloads.value.splice(userPayloadIndex, 1)
        }
      }
    })
    return unsubscribeFunction
  }

  async function unsubscribe(): Promise<void> {
    await services.user.unsubscribe('*')
  }

  return {
    userRecords,
    subscribe,
    unsubscribe,
  }
})
