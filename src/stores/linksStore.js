import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const useLinksStore = defineStore('links', () => {
  const isLoading = ref(false)
  const links = ref([])

  const fetchLinks = async () => {
    isLoading.value = true
    const { data, error } = await supabase
      .from('links')
      .select(
        'id, name, url, description, is_favorite, preview_image, click_count, categories (id, name)',
      )
      .order('created_at', { ascending: false })

    if (error) throw error
    links.value = data
    isLoading.value = false
  }

  return { isLoading, links, fetchLinks }
})
