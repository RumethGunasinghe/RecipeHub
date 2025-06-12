<template>
  <div class="full-width-bg">
    <div class="container my-4">
      <h2>Admin Moderation Panel</h2>

      <div class="mb-3">
        <button class="btn btn-outline-primary me-2" :class="{ active: viewMode === 'pending' }" @click="viewMode = 'pending'">
          Pending Recipes
        </button>
        <button class="btn btn-outline-primary" :class="{ active: viewMode === 'all' }" @click="viewMode = 'all'">
          All Recipes
        </button>
      </div>

      <input
        type="text"
        class="form-control mb-3"
        placeholder="Search by title..."
        v-model="searchTerm"
      />

      <div v-if="filteredRecipes.length === 0" class="alert alert-info">
        No recipes found.
      </div>

      <div v-for="recipe in filteredRecipes" :key="recipe.id" class="card mb-3">
        <div class="card-body">
          <template v-if="editingId === recipe.id">
            <input v-model="editForm.title" class="form-control mb-2" />
            <input v-model="editForm.cuisine" class="form-control mb-2" />
            <input v-model="editForm.dietary" class="form-control mb-2" placeholder="Comma separated dietary" />
            <textarea v-model="editForm.ingredients" class="form-control mb-2"></textarea>
            <textarea v-model="editForm.instructions" class="form-control mb-2"></textarea>

            <button class="btn btn-success me-2" @click="saveEdit(recipe.id)">Save</button>
            <button class="btn btn-secondary" @click="cancelEdit()">Cancel</button>
          </template>

          <template v-else>
            <h5>{{ recipe.title }} <small v-if="!recipe.approved" class="badge bg-warning text-dark">Pending</small></h5>
            <p><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>
            <p><strong>Dietary:</strong> {{ recipe.dietary.join(', ') || 'None' }}</p>
            <p>{{ recipe.description }}</p>

            <button v-if="!recipe.approved" class="btn btn-success me-2" @click="approveRecipe(recipe.id)">Approve</button>
            <button class="btn btn-danger me-2" @click="removeRecipe(recipe.id)">Remove</button>
            <button class="btn btn-outline-primary" @click="startEdit(recipe)">Edit</button>
          </template>
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const viewMode = ref('pending')
const searchTerm = ref('')
const recipes = ref([])
const editingId = ref(null)
const editForm = reactive({
  title: '',
  cuisine: '',
  dietary: '',
  ingredients: '',
  instructions: ''
})

function loadRecipes() {
  recipes.value = JSON.parse(localStorage.getItem('recipes') || '[]')
}

const filteredRecipes = computed(() => {
  let filtered = recipes.value
  if (viewMode.value === 'pending') {
    filtered = filtered.filter(r => !r.approved)
  }
  if (searchTerm.value.trim()) {
    filtered = filtered.filter(r => r.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
  }
  return filtered
})

function saveAll(updatedList) {
  localStorage.setItem('recipes', JSON.stringify(updatedList))
}

function approveRecipe(id) {
  const idx = recipes.value.findIndex(r => r.id === id)
  if (idx !== -1) {
    recipes.value[idx].approved = true
    saveAll(recipes.value)
  }
}

function removeRecipe(id) {
  const updated = recipes.value.filter(r => r.id !== id)
  recipes.value.splice(0, recipes.value.length, ...updated) // replace array contents
  saveAll(recipes.value)
}


function startEdit(recipe) {
  editingId.value = recipe.id
  editForm.title = recipe.title
  editForm.cuisine = recipe.cuisine
  editForm.dietary = recipe.dietary.join(', ')
  editForm.ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.join('\n')
    : recipe.ingredients
  editForm.instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions.join('\n')
    : recipe.instructions
}


function cancelEdit() {
  editingId.value = null
}

function saveEdit(id) {
  const idx = recipes.value.findIndex(r => r.id === id)
  if (idx === -1) return

  recipes.value[idx].title = editForm.title.trim()
  recipes.value[idx].cuisine = editForm.cuisine.trim()
  recipes.value[idx].dietary = editForm.dietary.split(',').map(d => d.trim()).filter(Boolean)

  recipes.value[idx].ingredients = editForm.ingredients
    .split('\n')
    .map(i => i.trim())
    .filter(Boolean)

  recipes.value[idx].instructions = editForm.instructions
    .split('\n')
    .map(i => i.trim())
    .filter(Boolean)

  saveAll(recipes.value)
  editingId.value = null
}



onMounted(() => {
  loadRecipes()
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
  height: 100%;
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