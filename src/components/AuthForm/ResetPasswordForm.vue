<template>
  <Form
    v-slot="$form"
    :initial-values="{ email }"
    :resolver="resolver"
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="submitForm"
  >
    <div class="mb-3">
      <InputText
        name="email"
        placeholder="Введите e-mail"
        type="text"
        v-model="email"
        class="w-full"
      />
      <Message v-if="$form.email?.invalid" severity="error" variant="simple" size="small">
        {{ $form.email.error.message }}
      </Message>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" class="w-full" label="Сбросить пароль" :loading="loading" />
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
import { useToastNotifications } from '@/composables/useToastNotifications.js'
import { useAuth } from '@/composables/useAuth.js'
import { Form } from '@primevue/forms'

const { showToast } = useToastNotifications()
const { resetPassword, loading, errorMessage } = useAuth()

const email = ref('')

const rules = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({ valid }) => {
  if (!valid) return

  try {
    await resetPassword(email.value)
    showToast('success', 'Ссылка на сброс пароля уже на вашей почте', '')
  } catch {
    showToast('error', 'Ошибка восстановления пароля', errorMessage.value)
  }
}
</script>
