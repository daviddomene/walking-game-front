import { createRouter, createWebHistory } from 'vue-router'
import Game from '../views/GameView.vue'; // Tu componente de la vista 'Game'
const routes = [
  {
    path: '/', // Parámetros de ancho y alto en la URL
    name: 'Game',
    component: Game,
    props: true // Habilita pasar los parámetros como props al componente
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
