<template>
  <div>
    <nav class="navbar navbar-expand-lg  px-3">
      <div class="container-fluid">
        <!-- Brand -->
        <router-link to="/" class="navbar-brand">RecipeHub</router-link>

        <!-- Burger Menu Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible Content -->
        <div class="collapse navbar-collapse navbarMenu" id="navbarContent">
          <!-- Left-aligned links -->
          <div class="navbar-nav me-auto menu">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/news" class="nav-link">News</router-link>
            <router-link to="/recipes" class="nav-link">Recipes</router-link>

            <router-link v-if="isAuthenticated" to="/submit" class="nav-link">Submit</router-link>
            <router-link v-if="isAuthenticated" to="/book" class="nav-link">My Book</router-link>
            <router-link v-if="isAdmin" to="/admin" class="nav-link">Admin</router-link>

            <router-link to="/about" class="nav-link">About</router-link>
          </div>

          <!-- Right-aligned items -->
          <div class="navbar-nav ms-auto">
            <span v-if="isAuthenticated" class="navbar-text me-3">Hi, {{ user?.name }}</span>
            <router-link v-if="!isAuthenticated" to="/login" class="nav-link">Login</router-link>
            <router-link v-if="!isAuthenticated" to="/register" class="nav-link">Register</router-link>
            <button
              v-if="isAuthenticated"
              @click="logout"
              class="btn btn-sm btn-outline-light ms-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>


<script setup>
import { useAuth } from './composables/useAuth'

import { ref, onMounted } from 'vue'

const allRecipes = ref([])

async function setupInitialRecipes() {
  const existing = localStorage.getItem('recipes')
  if (!existing) {
    const response = await fetch('/recipes.json')
    const data = await response.json()
    localStorage.setItem('recipes', JSON.stringify(data))
    console.log('Initial recipes seeded.')
  }
}

onMounted(async () => {
  await setupInitialRecipes()  // wait for seeding to complete
  allRecipes.value = JSON.parse(localStorage.getItem('recipes') || '[]')
})


const { user, isAuthenticated, isAdmin, logout } = useAuth()
</script>


<style scoped>
.navbar{
  margin-bottom: -30px;
  color: #b77e23 !important;
  padding-bottom: 20px;
  background-color: #2a425a;;

}
.navbar-brand{
  color: #b77e23 !important;
  font-weight: bold;
  font-size: 40px;

  
}

.navbar .nav-link {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 30px;
  padding-left: 30px;
  color: #a59e93 !important; 
  margin-bottom: -10px;
}

.navbar .nav-link:hover {
  color: #171306 !important; 
}

.navbar .navbar-text {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 30px;
  padding-left: 30px;
  color: #a59e93 !important; 
  margin-bottom: -10px;
}

.navbar .btn-outline-light {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 30px;
  color: #a59e93 !important; 
  margin-bottom: -10px;
  border-color: #b77e23 !important;
}

</style>