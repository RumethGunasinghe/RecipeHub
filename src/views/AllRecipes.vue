<template>
  <div class="full-width-bg">
    <div class="container my-5">
      <h2 class="mb-4">All Recipes</h2>

      <!-- Filters -->
      <div class="row mb-4">
        <div class="col-md-3 mb-2">
          <input v-model="filters.title" placeholder="Search by Title" class="form-control" />
        </div>
        <div class="col-md-3 mb-2">
          <input v-model="filters.cuisine" placeholder="Search by Cuisine" class="form-control" />
        </div>
        <div class="col-md-3 mb-2">
          <input v-model="filters.dietary" placeholder="Search by Dietary (e.g. Vegan)" class="form-control" />
        </div>
      </div>

      <!-- Recipe Cards -->
      <div class="row">
        <div v-for="recipe in paginatedRecipes" :key="recipe.id" class="col-md-6 mb-4 tiles">
          <div class="card h-100 d-flex flex-column">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="tiletopic">
                  {{ recipe.title }}
                </router-link>
              </h5>
              <p class="card-text"><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>
              <p class="card-text"><strong>Dietary:</strong> {{ recipe.dietary.join(', ') || 'None' }}</p>
              <p class="card-text">{{ recipe.description }}</p>

              <!-- Rating stars and average -->
              <div class="d-flex align-items-center mb-2">
                <div>
                  <span v-for="star in 5" :key="star" class="me-1" style="color: gold; font-size: 1.2em;">
                    {{ star <= Math.round(getAverageRating(recipe.id)) ? '★' : '☆' }}
                  </span>
                </div>
                <div class="ms-2" style="font-weight: 600;">
                  {{ getAverageRating(recipe.id).toFixed(1) }}
                </div>
              </div>

              <!-- Button pushed to bottom -->
              <button
                class="btn mt-auto"
                :class="isInBook(recipe.id) ? 'btn-danger' : 'btn-outline-primary'"
                @click="toggleBook(recipe)"
              >
                {{ isInBook(recipe.id) ? 'Remove from My Book' : 'Add to My Book' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
          </li>
          <li class="page-item disabled">
            <span class="page-link">Page {{ currentPage }} of {{ totalPages }}</span>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth'
import recipesJson from '../assets/recipes.json'

const { user } = useAuth()  // get current user

const allRecipes = ref([])
const currentPage = ref(1)
const itemsPerPage = 4

const filters = ref({
  title: '',
  cuisine: '',
  dietary: ''

})

const book = ref([])

// Generate unique localStorage key per user
function getBookKey() {
  return user.value ? `myRecipeBook_${user.value.email}` : null
}

// Load user's saved book from localStorage
function loadBook() {
  const key = getBookKey()
  if (key) {
    const storedBook = JSON.parse(localStorage.getItem(key) || '[]')
    book.value = storedBook
  } else {
    book.value = []
  }
}

// Save user's book to localStorage
function saveBook() {
  const key = getBookKey()
  if (key) {
    localStorage.setItem(key, JSON.stringify(book.value))
  }
}

// Get ratings array for a recipe from localStorage
function getRatingsForRecipe(recipeId) {
  const saved = localStorage.getItem(`ratings-${recipeId}`)
  return saved ? JSON.parse(saved) : []
}

// Compute average rating for a given recipeId
function getAverageRating(recipeId) {
  const ratings = getRatingsForRecipe(recipeId)
  if (ratings.length === 0) return 0
  const total = ratings.reduce((sum, r) => sum + r, 0)
  return total / ratings.length
}

onMounted(() => {
  const existing = localStorage.getItem('recipes')

  if (!existing) {
    // First run: store recipes.json into localStorage
    localStorage.setItem('recipes', JSON.stringify(recipesJson))
  }

  // Always read from localStorage
  allRecipes.value = JSON.parse(localStorage.getItem('recipes') || '[]')

  loadBook()
})


// Watch user change to reload their book
watch(() => user.value?.email, () => {
  loadBook()
})

const filteredRecipes = computed(() => {
  const dietaryFilter = filters.value.dietary.trim().toLowerCase()
  return allRecipes.value.filter(recipe => {
    if (!recipe.approved) return false
    return (
      recipe.title.toLowerCase().includes(filters.value.title.toLowerCase()) &&
      recipe.cuisine.toLowerCase().includes(filters.value.cuisine.toLowerCase()) &&
      (dietaryFilter === '' || recipe.dietary.some(d => d.toLowerCase().includes(dietaryFilter)))
    )
  })
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRecipes.value.length / itemsPerPage))
)

const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredRecipes.value.slice(start, start + itemsPerPage)
})

function isInBook(recipeId) {
  return book.value.some(r => r.id === recipeId)
}

function toggleBook(recipe) {
  if (!user.value) {
    alert('You must be logged in to save recipes to your book.')
    return
  }
  if (isInBook(recipe.id)) {
    book.value = book.value.filter(r => r.id !== recipe.id)
  } else {
    book.value.push(recipe)
  }
  saveBook()
}

watch(filters, () => {
  currentPage.value = 1
})
</script>



<style scoped>
  .full-width-bg {
  background-color: rgb(249, 241, 231); /* your desired color */
  width: 100vw;
  height: 990px;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 2rem 0; /* vertical padding, optional */
}
.tiles{
    font-family: 'Courier New', Courier, monospace;
}
h2{
  font-size: 40px;
}
.tiletopic{
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 30px;

  color:#2a425a !important; 
  margin-bottom: -10px;
}

.tiletopic:hover{
  color:#b77e23;
}
</style>

