<template>
  <div class="container my-5">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="w-50">
      <input v-model="email" class="form-control mb-2" placeholder="Email" type="email" />
      <input v-model="password" class="form-control mb-2" placeholder="Password" type="password" />
      <button class="btn btn-primary w-100">Login</button>
    </form>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { login } = useAuth()

const handleLogin = () => {
  if (!login(email.value, password.value)) {
    error.value = 'Invalid credentials'
  } else {
    router.push('/')
  }
}
</script>
