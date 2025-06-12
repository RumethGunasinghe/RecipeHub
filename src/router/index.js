import { createRouter, createWebHistory } from 'vue-router'


import About from '../components/About.vue'
import Home from '../components/Home.vue'
import News from '../components/News.vue'
import SubmitRecipe from '../views/SubmitRecipe.vue'
import AllRecipes from '../views/AllRecipes.vue'
import RecipeDetails from '../views/RecipeDetails.vue'
import MyRecipeBook from '../views/MyRecipeBook.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '/submit', name: 'SubmitRecipe', component: SubmitRecipe },
  { path: '/recipes', name: 'AllRecipes',component: AllRecipes},
  { path: '/recipes/:id', name: 'RecipeDetails', component: RecipeDetails, props: true },
  { path: '/book', name: 'MyRecipeBook', component: MyRecipeBook },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/admin', name: 'Admin', component: Admin }
]


const router = createRouter({
history: createWebHistory(),
routes,
})


export default router
