// composables/useAuth.js

import { ref, computed } from 'vue'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin'

// Initialize users array in localStorage with admin if not present
function initializeUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const hasAdmin = users.some(u => u.email === ADMIN_EMAIL)

  if (!hasAdmin) {
    users.push({
      name: 'Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
    })
    localStorage.setItem('users', JSON.stringify(users))
  }
}

// Call this once when the module loads
initializeUsers()

const user = ref(JSON.parse(localStorage.getItem('user')) || null)

const isAuthenticated = computed(() => user.value !== null)
const isAdmin = computed(() => user.value?.role === 'admin')

function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const found = users.find(u => u.email === email && u.password === password)
  if (found) {
    user.value = found
    localStorage.setItem('user', JSON.stringify(found))
    return true
  }
  return false
}

function register(name, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || []
  if (users.find(u => u.email === email)) return false
  const newUser = { name, email, password, role: 'user' }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('user', JSON.stringify(newUser))
  user.value = newUser
  return true
}

function logout() {
  localStorage.removeItem('user')
  user.value = null
}

export function useAuth() {
  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  }
}
