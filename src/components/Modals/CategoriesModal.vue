<template>
  <Toast />

  <Dialog modal header="Категория" v-model:visible="modelValue" :style="{ width: '25rem' }">
    <template v-if="isLoadingModal">
      <div class="grid mt-3 grid-cols-[1fr_32px] mb-1 items-center gap-5">
        <Skeleton width="100%" />
        <Skeleton shape="circle" size="2rem" />
      </div>
    </template>
    <template v-else>
      <Form @submit="saveCategory">
        <div class="gap-2 mb-2">
          <InputText
            v-model="categoryName"
            placeholder="Название новой категории"
            class="flex-auto w-full"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button type="button" label="Добавить" @click="saveCategory" />
        </div>
        <div
          class="grid mt-3 grid-cols-[1fr_32px] mb-1 gap-5"
          v-for="category in listCategories"
          :key="category.id"
        >
          {{ category.name }}
          <Button
            type="button"
            rounded
            size="small"
            variant="text"
            :loading="isLoading"
            icon="pi pi-times"
            @click="deleteCategory(category.id)"
          />
        </div>
      </Form>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '@/supabase.js'
import { useToastNotifications } from '@/composables/useToastNotifications'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { Form } from '@primevue/forms'

const modelValue = defineModel()
const { showToast } = useToastNotifications()

const isLoadingModal = ref(true)
const isLoading = ref(false)
const categoryName = ref('')
const listCategories = ref([])

const saveCategory = async () => {
  isLoading.value = true

  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: categoryName.value })
      .select()

    listCategories.value.push(data[0])

    if (error) throw error

    showToast('success', 'Успех', 'Категория добавлена')
    categoryName.value = ''
  } catch {
    showToast('error', 'Ошибка', 'Не удалось добавить категорию')
  } finally {
    isLoading.value = false
  }
}

const getCategories = async () => {
  isLoadingModal.value = true
  try {
    const { data, error } = await supabase.from('categories').select()

    if (error) throw error

    listCategories.value = data
    isLoadingModal.value = false
  } catch {
    showToast('error', 'Ошибка', 'Не удалось получить категории')
  }
}

const deleteCategory = async (id) => {
  isLoadingModal.value = true

  try {
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) throw error

    listCategories.value = listCategories.value.filter((category) => category.id !== id)
    showToast('success', 'Успех', 'Категория удалена')
  } catch {
    showToast('error', 'Ошибка', 'Не удалось удалить категорию')
  } finally {
    isLoadingModal.value = false
  }
}

watch(modelValue, async (newValue) => {
  if (newValue) await getCategories()
})
</script>
