<template>
  <form>
    <div class="mb-3">
      <InputText
        name="email"
        placeholder="Введите e-mail"
        type="text"
        v-model="formData.email"
        class="w-full"
      />
    </div>
    <div class="mb-3">
      <InputText
        name="password"
        placeholder="Введите пароль"
        type="password"
        v-model="formData.password"
        class="w-full"
      />
    </div>
    <span class="cursor-pointer mb-3 block">Забыли пароль?</span>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" class="w-full" label="Вход" />
      <Button type="submit" icon="pi pi-github" class="w-full" label="GitHub" severity="contrast" />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const formData = ref({
  email: '',
  password: '',
})
</script>
