<template>
  <Form
    v-slot="$form"
    :initial-values="{ password }"
    :resolver="resolver"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="submitForm"
  >
    <div class="mb-3">
      <InputText
        name="password"
        placeholder="Введите новый пароль"
        type="password"
        v-model="password"
        class="w-full"
      />
      <Message v-if="$form.password?.invalid" severity="error" variant="simple" size="small">
        {{ $form.password.error.message }}
      </Message>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" class="w-full" label="Задать новый пароль" :loading="loading" />
    </div>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToastNofitications } from '@/composables/useToastNotifications.js'
import { useAuth } from '@/composables/useAuth.js'
import { useRouter } from 'vue-router'
import { Form } from '@primevue/forms'

const { showToast } = useToastNofitications()
const { updatePassword, loading, errorMessage } = useAuth()
const router = useRouter()

const password = ref('')

const rules = z.object({
  password: z.string().min(6, { message: ' Должно быть минимум 6 символов' }),
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({ valid }) => {
  if (!valid) return

  try {
    await updatePassword(password.value)
    showToast('success', 'Пароль успешно создан!')
    router.replace('/auth')
  } catch {
    showToast('error', 'Ошибка при создании нового пароля', errorMessage.value)
  }
}
</script>
