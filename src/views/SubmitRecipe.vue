<template>
  <div class="full-width-bg">
    <div class="container my-4">
      <h2 >Submit a New Recipe</h2>

      <form @submit.prevent="submitRecipe" novalidate>
        <div class="mb-3">
          <label for="title" class="form-label">Title*</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
            required
            aria-describedby="titleHelp"
          />
          <div class="invalid-feedback" v-if="errors.title">{{ errors.title }}</div>
        </div>

        <div class="mb-3">
          <label for="cuisine" class="form-label">Cuisine*</label>
          <input
            id="cuisine"
            v-model="form.cuisine"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.cuisine }"
            required
          />
          <div class="invalid-feedback" v-if="errors.cuisine">{{ errors.cuisine }}</div>
        </div>

        <div class="mb-3">
          <label for="dietary" class="form-label">Dietary (comma separated)</label>
          <input
            id="dietary"
            v-model="form.dietary"
            type="text"
            class="form-control"
            placeholder="e.g. Vegan, Gluten-Free"
          />
        </div>

        <div class="mb-3">
          <label for="ingredients" class="form-label">Ingredients*</label>
          <textarea
            id="ingredients"
            v-model="form.ingredients"
            class="form-control"
            :class="{ 'is-invalid': errors.ingredients }"
            rows="3"
            required
          ></textarea>
          <div class="invalid-feedback" v-if="errors.ingredients">{{ errors.ingredients }}</div>
        </div>

        <div class="mb-3">
          <label for="instructions" class="form-label">Instructions*</label>
          <textarea
            id="instructions"
            v-model="form.instructions"
            class="form-control"
            :class="{ 'is-invalid': errors.instructions }"
            rows="5"
            required
          ></textarea>
          <div class="invalid-feedback" v-if="errors.instructions">{{ errors.instructions }}</div>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="!isLoggedIn">Submit Recipe</button>

        <p v-if="!isLoggedIn" class="text-danger mt-2">
          You must be logged in to submit a recipe.
        </p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useAuth } from '../composables/useAuth'

const { isAuthenticated, user } = useAuth()
const isLoggedIn = isAuthenticated

const form = reactive({
  title: '',
  cuisine: '',
  dietary: '',
  ingredients: '',
  instructions: ''
})

const errors = reactive({})

function validate() {
  errors.title = !form.title.trim() ? 'Title is required.' : ''
  errors.cuisine = !form.cuisine.trim() ? 'Cuisine is required.' : ''
  errors.ingredients = !form.ingredients.trim() ? 'Ingredients are required.' : ''
  errors.instructions = !form.instructions.trim() ? 'Instructions are required.' : ''
  return !errors.title && !errors.cuisine && !errors.ingredients && !errors.instructions
}

function submitRecipe() {
  if (!validate()) return

  const newRecipe = {
    id: Date.now(),
    title: form.title.trim(),
    cuisine: form.cuisine.trim(),
    dietary: form.dietary.split(',').map(s => s.trim()).filter(Boolean),
    ingredients: form.ingredients.trim(),
    instructions: form.instructions.trim(),
    description: form.instructions.split('\n')[0] || '', // use first line of instructions
    approved: false,
    submittedBy: user.value?.email || 'anonymous'
  }

  const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]')
  savedRecipes.push(newRecipe)
  localStorage.setItem('recipes', JSON.stringify(savedRecipes))

  alert('Recipe submitted! Awaiting admin approval.')

  // Clear form
  Object.keys(form).forEach(key => form[key] = '')
}
</script>

<style scoped>
.container{
 padding-top: 20px;
}
  .full-width-bg {
  background-color: rgb(249, 241, 231); /* your desired color */
  width: 100vw;
  height: 990px;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 2rem 0; /* vertical padding, optional */
}


h2{
  font-size: 40px;
}
</style>