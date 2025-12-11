<template>
  <Header v-if="authStore.user" />
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'

const authStore = useUserStore()

onMounted(async () => {
  await authStore.getUser()
})
</script>

<style scoped></style>
