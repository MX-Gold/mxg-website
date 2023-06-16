import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { userPayloadToRecord, type UserPayload, type UserRecord } from '@/records/user'
import services from '@/services'

interface RegisterAndSignInBody {
  username: string
  email: string
  emailVisibility: boolean
  password: string
  passwordConfirm: string
}

interface SignInBody {
  username: string
  password: string
}

interface RequestVerificationBody {
  email: string
}

interface ConfirmVerificationBody {
  token: string
}

interface RequestPasswordResetBody {
  email: string
}

interface ConfirmPasswordResetBody {
  token: string
  password: string
  passwordConfirm: string
}

interface RequestEmailChangeBody {
  newEmail: string
}

interface ConfirmEmailChangeBody {
  token: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(services.pb.authStore.token)
  const currentUserPayload = ref(services.pb.authStore.model as UserPayload | null)
  const currentUserRecord = computed<UserRecord | null>(() => {
    if (currentUserPayload.value) {
      return userPayloadToRecord(currentUserPayload.value)
    }
    return null
  })
  const authenticated = computed<boolean>(() => {
    return !!currentUserPayload.value
  })

  services.pb.authStore.onChange((token, model) => {
    accessToken.value = token
    currentUserPayload.value = model as UserPayload | null
  })

  async function registerAndSignIn(body: RegisterAndSignInBody): Promise<void> {
    const newUserPayload = await services.user.create<UserPayload>(body)
    if (newUserPayload.email !== '') {
      await requestVerification({ email: newUserPayload.email })
    }
    await signIn({ username: body.username, password: body.password })
  }

  async function signIn(body: SignInBody): Promise<void> {
    await services.user.authWithPassword(body.username, body.password)
  }

  function signOut(): void {
    services.pb.authStore.clear()
  }

  async function refreshAuth(): Promise<void> {
    await services.user.authRefresh()
  }

  async function requestVerification(body: RequestVerificationBody): Promise<void> {
    await services.user.requestVerification(body.email)
  }

  async function confirmVerification(body: ConfirmVerificationBody): Promise<void> {
    await services.user.confirmVerification(body.token)
    await refreshAuth()
  }

  async function requestPasswordReset(body: RequestPasswordResetBody): Promise<void> {
    await services.user.requestPasswordReset(body.email)
  }

  async function confirmPasswordReset(body: ConfirmPasswordResetBody): Promise<void> {
    await services.user.confirmPasswordReset(body.token, body.password, body.passwordConfirm)
    await refreshAuth()
  }

  async function requestEmailChange(body: RequestEmailChangeBody): Promise<void> {
    await services.user.requestEmailChange(body.newEmail)
  }

  async function confirmEmailChange(body: ConfirmEmailChangeBody): Promise<void> {
    await services.user.confirmEmailChange(body.token, body.password)
    await refreshAuth()
  }

  return {
    accessToken,
    currentUserRecord,
    authenticated,
    registerAndSignIn,
    signIn,
    signOut,
    refreshAuth,
    requestVerification,
    confirmVerification,
    requestPasswordReset,
    confirmPasswordReset,
    requestEmailChange,
    confirmEmailChange,
  }
})
