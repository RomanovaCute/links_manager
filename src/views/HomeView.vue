<template>
  <main>Links Manager</main>
  <Button label="Submit" />
</template>

<script setup>
import { onMounted } from 'vue'
import Button from 'primevue/button'

onMounted(() => {
  if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')

    if (accessToken) {
      window.history.replaceState(null, null, window.location.pathname)
    }
  }
})
</script>
