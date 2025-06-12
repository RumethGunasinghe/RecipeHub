# RecipeHub - Vue.js Recipe Sharing Platform

## Overview

RecipeHub is a responsive, single-page web application built using Vue.js 3 and Bootstrap. It allows users to submit, browse, search, and manage recipes. The application supports user authentication, an admin moderation panel, and localStorage-based persistence for user data and recipe content.

## Features

* User authentication (login, register, logout)
* Recipe submission form with admin approval/validation
* Recipe browsing with search and detail views
* Personalized recipe book (favorites)
* Admin moderation panel to approve/edit/delete recipes
* Role-based access control
* Responsive and modern UI using Bootstrap 5
* Data stored locally using `localStorage`

## Project Structure

```
├── components
│   ├── About.vue
│   ├── Home.vue
│   ├── News.vue
├── views
│   ├── SubmitRecipe.vue
│   ├── AllRecipes.vue
│   ├── RecipeDetails.vue
│   ├── MyRecipeBook.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── Admin.vue
├── composables
│   ├── useAuth.js
├── router
│   ├── index.js
├── utils
│   ├── storage.js
├── App.vue
├── main.js
├── assets
│   └── recipes.json
```


## Setup Instructions

### Prerequisites

* Node.js v16+
* npm or yarn

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## ADMIN credentials already saved from backend.

```json
{
  "email": "admin@example.com",
  "password": "admin",
  "name": "Admin",
  "role": "admin"
}
```

## Technologies Used

* Vue.js 3 (Composition API)
* Vue Router
* Bootstrap 5
* LocalStorage for persistence

## Future Enhancements

* Migrate from `localStorage` to Firebase or a backend API
* Image uploads for recipes
* Comments and ratings system
* Mobile-first UX improvements

## License

This project is for educational purposes and open to modification.

---

For any inquiries or contributions, feel free to fork or submit an issue!
