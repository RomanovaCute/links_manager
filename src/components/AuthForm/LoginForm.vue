<template>
  <Form
    v-slot="$form"
    :initial-values="formData"
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
        v-model="formData.email"
        class="w-full"
      />
      <Message v-if="$form.email?.invalid" severity="error" variant="simple" size="small">
        {{ $form.email.error.message }}
      </Message>
    </div>
    <div class="mb-3">
      <InputText
        name="password"
        placeholder="Введите пароль"
        type="password"
        v-model="formData.password"
        class="w-full"
      />
      <Message v-if="$form.password?.invalid" severity="error" variant="simple" size="small">
        {{ $form.password.error.message }}
      </Message>
    </div>
    <span class="cursor-pointer mb-3 block" @click="emits('resetPassword')">Забыли пароль?</span>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" class="w-full" label="Вход" :loading="loading" />
      <Button
        @click="signInWithGitHub"
        icon="pi pi-github"
        class="w-full"
        label="GitHub"
        severity="contrast"
      />
    </div>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToastNofitications } from '@/composables/useToastNotifications.js'
import { useAuth } from '@/composables/useAuth.js'
import { useUserStore } from '@/stores/userStore'
import { Form } from '@primevue/forms'

const { showToast } = useToastNofitications()
const { signIn, signInWithGitHub, loading, errorMessage } = useAuth()
const router = useRouter()
const authStore = useUserStore()

const emits = defineEmits(['resetPassword'])

const formData = ref({
  email: '',
  password: '',
})

const rules = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(6, { message: ' Должно быть минимум 6 символов' }),
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({ valid }) => {
  if (!valid) return

  try {
    await signIn({
      email: formData.value.email,
      password: formData.value.password,
    })
    await authStore.getUser()
    router.replace({ name: 'home' })
  } catch {
    showToast('error', 'Ошибка входа', errorMessage.value)
  }
}
</script>
