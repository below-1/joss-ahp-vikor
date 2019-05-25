import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('./views/app/App.vue'),
      children: [
        {
          path: 'data',
          name: 'app-data',
          component: () => import('./views/app/data/index.vue'),
          children: [
            {
              path: 'add',
              name: 'app-data-add',
              component: () => import('./views/app/data/add/index.vue')
            },
            {
              path: 'raw',
              name: 'app-data-raw',
              component: () => import('./views/app/data/raw.vue')
            },
            {
              path: 'processed',
              name: 'app-data-process',
              component: () => import('./views/app/data/processed.vue')
            }
          ]
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('./views/app/settings.vue')
        },
        {
          path: 'rank',
          name: 'rank',
          component: () => import('./views/app/rank2.vue')
        },
        {
          path: 'rank2',
          name: 'rank2',
          component: () => import('./views/app/rank2.vue')
        },
        {
          path: 'testing',
          name: 'testing',
          component: () => import('./views/app/testing.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
