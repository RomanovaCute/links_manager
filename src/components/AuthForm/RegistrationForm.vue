<template>
  <Toast />
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
    <div class="mb-3">
      <InputText
        name="firstname"
        placeholder="Введите своё имя"
        type="text"
        v-model="formData.firstname"
        class="w-full"
      />
      <Message v-if="$form.firstname?.invalid" severity="error" variant="simple" size="small">
        {{ $form.firstname.error.message }}
      </Message>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" class="w-full" label="Регистрация" />
      <Button type="submit" icon="pi pi-github" class="w-full" label="GitHub" severity="contrast" />
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
import { Form } from '@primevue/forms'
import Toast from 'primevue/toast'
import { supabase } from '@/supabase.js'

const { showToast } = useToastNofitications()

const formData = ref({
  email: '',
  password: '',
  firstname: '',
})

const rules = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(6, { message: 'Должно быть минимум 6 символов' }),
  firstname: z.string().min(1, { message: 'Имя обязательно для заполнения' }),
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({ valid }) => {
  if (!valid) return

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    showToast('error', 'Ошибка', error)
  } else {
    showToast('success', 'Регистрация', 'Вы успешно зарегистрированы')
  }

  console.log(data, error)
}
</script>
