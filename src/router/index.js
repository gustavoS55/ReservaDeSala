import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashboard.vue'),
    },
    
    {
      path: '/reserva',
      children: [
        { path: '', name: 'salas.index', component: () => import('@/views/reservas/index.vue')},
        { path: 'add', name: 'salas.add', component: () => import('@/views/reservas/add.vue')}
        
      ]
    },
    {
      path: '/professores',
      children:[
        {path: '', name: 'professores.index',component: () => import('@/views/professores/index.vue')},
        {path: 'addProf', name: 'professores.add', component: () => import ('@/views/professores/addProf.vue')},
      ]
    
    },
    {
      path: '/salas',
      children:[
        {path: '', name: 'sala.index',component: () => import('@/views/salas/index.vue')},
        {path: '', name: 'sala.add',component: () => import('@/views/salas/addSalas.vue')},
       
      ]
    
    },
  ],
})

export default router
