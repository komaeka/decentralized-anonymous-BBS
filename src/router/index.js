import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublishView from '../views/PublishView.vue'
import PostView from '../views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView
    },
    {
      path: '/post/:postPosition',
      name: 'post',
      component: PostView
    }
  ]
})

export default router
