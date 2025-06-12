<template>
  <div class="full-width-bg">
    <div class="container my-5">
      <h2 class="text-xl font-bold mb-4">My Recipe Book</h2>

      <div v-if="book.length === 0" class="text-gray-500">
        No recipes saved yet.
      </div>

      <div class="row" v-else>
        <div
          v-for="recipe in book"
          :key="recipe.id"
          class="col-6 mb-4"
        >
          <div class="p-4 border rounded shadow-sm h-100 d-flex flex-column tiles">
            <router-link
              :to="{ name: 'RecipeDetails', params: { id: recipe.id } }"
              class="text-lg font-semibold text-blue-600 hover:underline tiletopic"
            >
              {{ recipe.title }}
            </router-link>
            <p class="text-sm text-gray-600">{{ recipe.description }}</p>

            <div class="mt-2 d-flex gap-2 text-sm flex-wrap">
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ recipe.cuisine }}</span>
              <span
                v-for="tag in recipe.dietary"
                :key="tag"
                class="bg-green-100 text-green-800 px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>

            <button
              @click="removeFromBook(recipe.id)"
              class="btn btn-danger mt-auto mt-3"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
const book = ref([])

function getKey() {
  return user.value ? `myRecipeBook_${user.value.email}` : null
}

function loadBook() {
  const key = getKey()
  if (key) {
    const stored = localStorage.getItem(key)
    if (stored) {
      book.value = JSON.parse(stored)
    }
  }
}

function saveBook() {
  const key = getKey()
  if (key) {
    localStorage.setItem(key, JSON.stringify(book.value))
  }
}

function removeFromBook(id) {
  book.value = book.value.filter(r => r.id !== id)
  saveBook()
}

// load when user is set
onMounted(() => {
  if (user.value) {
    loadBook()
  }
})

// optional: reload when user changes
watch(() => user.value?.email, () => {
  loadBook()
})
</script>


<style scoped>
.container{
 padding-top: 20px;
}
h2{
  font-size: 40px;
}
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
    background-color: rgb(255, 255, 255);
}
.tiletopic{
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 30px;
  padding-bottom: 15px;
  color:#2a425a !important; 
  margin-bottom: -10px;
}
</style>