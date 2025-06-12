export const getUser = () => JSON.parse(localStorage.getItem('user')) || null
export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user))

export const getRecipes = () => JSON.parse(localStorage.getItem('recipes')) || []
export const saveRecipes = (recipes) => localStorage.setItem('recipes', JSON.stringify(recipes))

export const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || []
export const saveFavorites = (favs) => localStorage.setItem('favorites', JSON.stringify(favs))
