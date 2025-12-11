<template>
  <div class="mb-5">
    <Menubar>
      <template #start>
        <div class="flex items-center gap-2">
          <span class="font-bold">Link Manager</span>
          <div class="flex items-center gap-2">
            <Button icon="pi pi-link" rounded />
            <Button icon="pi pi-folder" rounded />
          </div>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar :label="emailFirstLetter" size="large" shape="circle" />
          <Button @click="signOutUser" icon="pi pi-sign-out" rounded severity="secondary" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menubar from 'primevue/menubar'

import { useToastNofitications } from '@/composables/useToastNotifications.js'
import { useUserStore } from '@/stores/userStore.js'
import { useAuth } from '@/composables/useAuth.js'

const { showToast } = useToastNofitications()
const authStore = useUserStore()
const router = useRouter()
const { signOut, errorMessage } = useAuth()

const signOutUser = async () => {
  try {
    await signOut()
    authStore.resetUser()
    await router.replace({ name: 'auth' })
  } catch {
    showToast('error', 'Ошибка выхода', errorMessage.value)
  }
}

const emailFirstLetter = computed(() => {
  return authStore.user?.email ? authStore.user.email[0].toUpperCase() : ''
})
</script>
