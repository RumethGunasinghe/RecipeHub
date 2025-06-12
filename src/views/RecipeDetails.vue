<template>
  <div class="container my-5" v-if="recipe">

    <h2 class="title">{{ recipe.title }}</h2>
    <p><strong>Description:</strong> {{ recipe.description }}</p>
    <p><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>
    <p><strong>Dietary:</strong> {{ recipe.dietary.join(', ') || 'None' }}</p>
    <p><strong>Prep Time:</strong> {{ recipe.prepTime }}</p>
    <p><strong>Cook Time:</strong> {{ recipe.cookTime }}</p>
    <p><strong>Servings:</strong> {{ recipe.servings }}</p>

    <h4>Ingredients</h4>
    <ul>
      <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">{{ ingredient }}</li>
    </ul>

    <h4>Instructions</h4>
    <p>{{ recipe.instructions }}</p>

    <hr />
    
    <h3>Rate This Recipe:</h3>
    <div v-if="user">
  <h3>Rate This Recipe</h3>
  <div>
    <span v-for="n in 5" :key="n" @click="rate(n)" style="cursor: pointer; font-size: 24px;">
      <span :style="{ color: userRating >= n ? 'gold' : '#ccc' }">★</span>
    </span>
    <p>Average Rating: {{ averageRating() }} ({{ ratings.length }} ratings)</p>
  </div>

  <hr />

  <!-- Comments -->
  <h3>Comments</h3>
  <ul>
    <li v-for="(comment, index) in comments" :key="index">
      <strong>{{ displayUser(comment.user) }}:</strong> {{ comment.text }}
    </li>
  </ul>
  <input
    v-model="newComment"
    placeholder="Leave a comment"
    class="form-control my-2"
  />
  <button @click="addComment" class="btn btn-primary">Add Comment</button>
</div>

<!-- Message if not logged in -->
<div v-else>
  <hr />
  <h4>You must be logged in to rate or comment on this recipe.</h4>
</div>

<br />
<router-link to="/recipes" class="btn btn-primary mt-3">Back to Recipes</router-link>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'  // adjust path as needed

const route = useRoute()
const recipe = ref(null)
const recipeId = parseInt(route.params.id)

const { user } = useAuth()

// Comments
const comments = ref([])
const newComment = ref('')

// Ratings
const ratings = ref([])
const userRating = ref(0)

// Load data on mount
onMounted(() => {
  const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]')
  recipe.value = storedRecipes.find(r => r.id === recipeId) || null

  loadComments()
  loadRatings()
  loadUserRating()
})

// Comments functions
function loadComments() {
  const saved = localStorage.getItem(`comments-${recipeId}`)
  comments.value = saved ? JSON.parse(saved) : []
}

function addComment() {
  if (newComment.value.trim() === '') return

  const username = user.value ? (user.value.name || user.value.email) : 'Anonymous'

  comments.value.push({
    user: username,
    text: newComment.value.trim(),
  })

  localStorage.setItem(`comments-${recipeId}`, JSON.stringify(comments.value))
  newComment.value = ''
}

function displayUser(commentUser) {
  if (!user.value) return commentUser
  return commentUser === (user.value.name || user.value.email) ? 'You' : commentUser
}

// Ratings functions
function loadRatings() {
  const saved = localStorage.getItem(`ratings-${recipeId}`)
  ratings.value = saved ? JSON.parse(saved) : []
}

function loadUserRating() {
  const saved = localStorage.getItem(`userRating-${recipeId}`)
  userRating.value = saved ? parseInt(saved) : 0
}

function rate(rating) {
  if (userRating.value === rating) {
    removeUserRating()
  } else {
    saveUserRating(rating)
  }
  updateRatings(rating)
}

function saveUserRating(rating) {
  userRating.value = rating
  localStorage.setItem(`userRating-${recipeId}`, rating)
}

function removeUserRating() {
  userRating.value = 0
  localStorage.removeItem(`userRating-${recipeId}`)
  updateRatings(0)
}

function updateRatings(newRating) {
  if (userRating.value !== 0) {
    if (ratings.value.length > 0) {
      ratings.value.pop()
    }
  }

  if (newRating !== 0) {
    ratings.value.push(newRating)
  }

  localStorage.setItem(`ratings-${recipeId}`, JSON.stringify(ratings.value))
}

function averageRating() {
  if (ratings.value.length === 0) return 0
  const total = ratings.value.reduce((sum, r) => sum + r, 0)
  return (total / ratings.value.length).toFixed(1)
}
</script>


<style scoped>
  .container{
    font-family: 'Courier New', Courier, monospace;
    font-size: 30px;
  }
  .title{
    font-family: sans-serif;
    font-weight: bolder;
    font-size: 100px;
  }
  h3{
    font-weight: bold;
  }
</style>