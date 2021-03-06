import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Home from '../views/Home'
import ArticleV from '../views/Article'
import Account from '../views/Account'





Vue.use(VueRouter)

const routes = [

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: 'Groupomania - Accueil' }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Groupomania - Connexion' }

  },
  {
    path: '/',
    component: Signup,
    name: 'Signup',
    meta: { title: 'Groupomania - Inscription' }
  },
  {
    path: '/article/:id',
    component: ArticleV,
    name: 'ArticleV',
    meta: { title: 'Groupomania - Article' }
  },
  {
    path: '/account',
    component: Account,
    name: 'Account',
    meta: { title: 'Groupomania - Mon Profil' }
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
});

export default router
