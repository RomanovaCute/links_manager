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
    <div class="grid grid-cols-2 gap-3">
      <Button type="submit" class="w-full" label="Сбросить пароль" />
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
import { Form } from '@primevue/forms'

const formData = ref({
  email: '',
})

const rules = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
})

const resolver = ref(zodResolver(rules))

const submitForm = async ({ valid }) => {
  console.log(valid)
}
</script>
