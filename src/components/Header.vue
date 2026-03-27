<template>
  <CategoriesModal v-model="categoriesDialogVisible" />
  <CreateLinkModal v-model="createLinkDialogVisible" />
  <div class="mb-5">
    <Menubar>
      <template #start>
        <div class="flex items-center gap-2">
          <span class="font-bold">Менеджер ссылок</span>
          <div class="flex items-center gap-2">
            <Button icon="pi pi-link" rounded @click="createLinkDialogVisible = true" />
            <Button icon="pi pi-folder" rounded @click="categoriesDialogVisible = true" />
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menubar from 'primevue/menubar'
import CategoriesModal from '@/components/Modals/CategoriesModal.vue'
import CreateLinkModal from '@/components/Modals/CreateLinkModal.vue'

import { useToastNotifications } from '@/composables/useToastNotifications.js'
import { useUserStore } from '@/stores/userStore.js'
import { useAuth } from '@/composables/useAuth.js'

const { showToast } = useToastNotifications()
const authStore = useUserStore()
const router = useRouter()
const { signOut, errorMessage } = useAuth()

const categoriesDialogVisible = ref(false)
const createLinkDialogVisible = ref(false)

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
