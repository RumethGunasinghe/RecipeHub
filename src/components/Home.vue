<template>
  <div class="full-width-bg">
    <div class="container my-5">

      <!-- Title -->
      <div class="row mt-5 topicArea">
        <h1 class="text-center mb-4 title">Welcome to RecipeHub!</h1>

        <!-- Welcome Paragraph -->
        <p class="lead text-center" style="color: aliceblue;">
          Discover and share delicious recipes from your community. Whether you're a seasoned chef or just starting out,
          RecipeHub helps you explore culinary creativity and save your favorites in your personal recipe book.
        </p>
      </div>
      
    </div>
  </div>
  <div class = "container my-6 content">
    <!-- Images Rowa -->
      <!-- Image 1 -->
      <div class="row mt-5 tile">
        <div class="col-md-6 ">
          <img
            src="../assets/foodimage1.jpg"
            class="img-fluid rounded shadow"
            alt="Delicious Dish 1"
          />
        </div>
        <div class="col-md-6 image1 details">
          <p class="categories">Bread, Basics, Dinner ~ 25/3/23</p>
          <p class="topic">Duck Ragu w/Parmesan Gnocchi</p>
          <p class="desc">A traditional Neapolitan pizza dough which is quick to prepare</p>
        </div>
      </div>
      <!-- Image 2 -->
      <div class="row mt-5 tile">
         <div class="col-md-6  image1 details">
          <p class="categories">Dinner - Vegetarian - Basic - pressureCooker</p>
          <p class="topic">Vegetarian Chilli</p>
          <p class="desc">A traditional Neapolitan pizza dough which is quick to prepare</p>
         </div>
        <div class="col-md-6">
          <img
            src="../assets/foodimage2.jpeg"
            class="img-fluid rounded shadow"
            alt="Delicious Dish 1"
          />
        </div>
      </div>
      <!-- Image 3 -->
      <div class="row mt-5 tile">
        <div class="col-md-6 ">
          <img
            src="../assets/foodimage3.jpg"
            class="img-fluid rounded shadow"
            alt="Delicious Dish 1"
          />
        </div>
        <div class="col-md-6 image1 details">
          <p class="categories">Bread, Basics, Dinner ~ 25/3/23</p>
          <p class="topic">Japanese Curry</p>
          <p class="desc">A Japanese Curry Rice with onion, Garlic and Ginger </p>
        </div>
      </div>
  </div>
</template>

<script setup>
// No script logic needed for static home content
</script>

<style scoped>
.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #b77e23 !important;
  text-align: center;
  margin-bottom: 1rem;
}
.full-width-bg {
  background-color: #2a425a; /* your desired color */
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 2rem 0; /* vertical padding, optional */
}
.topic {
  font-family:'Courier New', Courier, monospace ;
  font-weight: bolder;
  font-size: 50px;
}
.categories{
  font-family: 'Courier New', Courier, monospace;
}
.details{
  margin-top: 70px;
}
.tile{
  background-color: rgb(244, 242, 240);
  padding: 10px;
}
</style>
