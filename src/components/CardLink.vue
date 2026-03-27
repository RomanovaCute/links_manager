<template>
  <Card class="relative">
    <template #title>
      <div class="flex items-center gap-2 pr-10">
        <img :src="link.preview_image" :alt="link.name" />
        <a :href="link.url" target="_blank">{{ link.name }}</a>
      </div>
    </template>
    <template #content>
      <div class="flex gap-2 flex-col">
        <div class="font-bold">{{ link.categories.name }}</div>
        <div class="h-full" v-if="link.description">{{ link.description }}</div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import { useLinksStore } from '@/stores/linksStore'

const linksStore = useLinksStore()

const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
})
</script>
