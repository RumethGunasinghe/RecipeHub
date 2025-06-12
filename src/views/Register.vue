<template>
  <div class="container my-5">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister" class="w-50">
      <input v-model="name" class="form-control mb-2" placeholder="Name" />
      <input v-model="email" class="form-control mb-2" placeholder="Email" />
      <input v-model="password" class="form-control mb-2" placeholder="Password" type="password" />
      <button class="btn btn-success w-100">Register</button>
    </form>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { register } = useAuth()

const handleRegister = () => {
  if (!register(name.value, email.value, password.value)) {
    error.value = 'User already exists'
  } else {
    router.push('/')
  }
}
</script>
