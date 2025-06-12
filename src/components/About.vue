<template>
  <div class="full-width-bg">
    <div class="container my-5">
      <div class="row">
        <!-- Left Column -->
        <div class="col-12 col-md-6 mb-4">
          <h2>About RecipeHub</h2>

          <!-- App Description -->
          <p>
            Welcome to RecipeHub, your community-driven destination for discovering, 
            sharing, and celebrating recipes from around the world. Whether you're a
            home cook, a seasoned chef, or someone exploring new cuisines, RecipeHub
            empowers you to find inspiration and connect through food. Our platform 
            lets users browse a diverse collection of recipes, filter by cuisine, 
            dietary preferences, or ingredients, and view detailed instructions and 
            ratings from fellow food enthusiasts. What sets RecipeHub apart is its 
            collaborative spirit — members can upload their own recipes, share cooking
            tips, leave comments, and build a personalized recipe book. With
            real-time features like live commenting and recipe ratings, we aim 
            to create a vibrant, interactive space where culinary creativity 
            thrives. Join us in making cooking more joyful, accessible, and 
            connected — one recipe at a time.
          </p>

   


          

          <!-- Welcome Message -->
          <div v-if="fullName" >
            <h1>Welcome, {{ fullName }}!</h1>
          </div>
          <hr />
          <div class="row mb-4">
            <div class="col-md-6">
              <input
                v-model="firstName"
                class="form-control"
                placeholder="First Name"
              />
            </div>
            <div class="col-md-6">
              <input
                v-model="lastName"
                class="form-control"
                placeholder="Last Name"
              />
            </div>
          </div>
          <fieldset class="mb-3">
            <legend class="form-label">Choose a theme:</legend>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="mountain" value="mountain" v-model="selectedTheme" />
              <label class="form-check-label" for="mountain">Mountain</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="ocean" value="ocean" v-model="selectedTheme" />
              <label class="form-check-label" for="ocean">Ocean</label>
            </div>
          </fieldset>
        </div>

        <!-- Right Column -->
        <div class="col-12 col-md-6">
          <div class="mt-4 text-center">
            <img
              v-if="selectedTheme === 'mountain'"
              src="../assets/aboutimage1.jpg"
              class="img-fluid rounded shadow"
              alt="Mountain"
            />
            <img
              v-else-if="selectedTheme === 'ocean'"
              src="../assets/aboutimage2.jpg"
              class="img-fluid rounded shadow"
              alt="Ocean"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')
const selectedTheme = ref('mountain')

const fullName = computed(() => {
  if (firstName.value || lastName.value) {
    return `${firstName.value} ${lastName.value}`.trim()
  }
  return ''
})
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}

h1{
  color:white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 70px;
  text-align: right;
}
h2{
  color: #b77e23 !important; 
  text-align: right;
  font-size: 80px;
}
.full-width-bg {
  background-color: #2a425a; 
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 2rem 0; 
}
p{
  color:white;
  font-family:'Courier New', Courier, monospace;
  text-align: justify;
  font-size: 20px;
}

</style>


