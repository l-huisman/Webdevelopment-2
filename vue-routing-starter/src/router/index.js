import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import CreateProducts from '../components/CreateProduct.vue';
import ProductList from '../components/ProductList.vue';

// import the missing components

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/create', component: CreateProducts },
    { path: '/products', component: ProductList },
    // add the missing routes
  ]
})

export default router