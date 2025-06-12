<template>
  <div class="full-width-bg">
    <div class="container my-5">
      <h2 class="mb-4">Recipe News & Updates</h2>

      <!-- Search & Filter -->
      <div class="row mb-4">
        <div class="col-md-3 mb-2">
          <input v-model="filters.title" class="form-control" placeholder="Search by Title" />
        </div>
        <div class="col-md-3 mb-2">
          <input v-model="filters.date" type="date" class="form-control" />
        </div>
        <div class="col-md-3 mb-2">
          <input v-model="filters.category" class="form-control" placeholder="Search by Category" />
        </div>
        <div class="col-md-3 mb-2">
          <input v-model="filters.content" class="form-control" placeholder="Search by Content" />
        </div>
      </div>

      <!-- Recipe List -->
      <div class="row tiles">
        <div
          v-for="recipe in paginatedRecipes"
          :key="recipe.id"
          class="col-md-6 mb-4"
        >
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
              <p class="card-text"><strong>Date:</strong> {{ recipe.date }}</p>
              <p class="card-text"><strong>Category:</strong> {{ recipe.category }}</p>
              <p class="card-text">{{ recipe.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--">Previous</button>
          </li>
          <li class="page-item disabled">
            <span class="page-link">Page {{ currentPage }} of {{ totalPages }}</span>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import recipesData from '../assets/news.json'  

const allRecipes = ref([])
const currentPage = ref(1)
const itemsPerPage = 6

const filters = ref({
  title: '',
  date: '',
  category: '',
  content: ''
})

onMounted(() => {
  allRecipes.value = recipesData
})

const filteredRecipes = computed(() => {
  return allRecipes.value.filter(recipe => {
    return (
      recipe.title.toLowerCase().includes(filters.value.title.toLowerCase()) &&
      recipe.date.includes(filters.value.date) &&
      recipe.category.toLowerCase().includes(filters.value.category.toLowerCase()) &&
      recipe.content.toLowerCase().includes(filters.value.content.toLowerCase())
    )
  })
})

const totalPages = computed(() =>
  Math.ceil(filteredRecipes.value.length / itemsPerPage)
)

const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredRecipes.value.slice(start, start + itemsPerPage)
})
</script>



<style scoped>
  h2{
    font-size: 40PX;
  }
  .tiles{
    font-family: 'Courier New', Courier, monospace;
    box-shadow: 10px;
  }
  .card-title{
    font-weight: bold;
  }
  .full-width-bg{
    background-color: rgb(249, 241, 231);
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding: 2rem 0; 
  }
</style>