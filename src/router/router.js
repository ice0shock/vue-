import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CategoryCreate from '../views/CategoryCreate'
import CategoryList from '../views/CategoryList'
import ItemCreate from '../views/ItemCreate'
import ItemList from '../views/ItemList'
import HeroCreate from '../views/HeroCreate'
import HeroList from '../views/HeroList'
import ArticleCreate from '../views/ArticleCreate'
import ArticleList from '../views/ArticleList'
import ADCreate from '../views/ADCreate'
import ADList from '../views/ADList'
import UserCreate from '../views/UserCreate'
import UserList from '../views/UserList'
import Login from '../views/Login'


Vue.use(Router)

export default new Router({
  routes: [{

      path: '/login',
      name: 'login',
      component: Login

    },
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: "/categories/list",
      children: [{
          path: '/categories/creat',
          name: 'CategoryCreat',
          component: CategoryCreate
        },
        {
          path: '/categories/list',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/categories/:id',
          name: 'CategoryEdit',
          component: CategoryCreate,
          props: true
        }, {
          path: '/items/creat',
          name: 'itemCreat',
          component: ItemCreate
        },
        {
          path: '/items/list',
          name: 'itemList',
          component: ItemList
        },
        {
          path: '/items/:id',
          name: 'itemEdit',
          component: ItemCreate,
          props: true
        },
        {
          path: '/heroes/creat',
          name: 'heroesCreat',
          component: HeroCreate
        },
        {
          path: '/heroes/list',
          name: 'heroesList',
          component: HeroList
        },
        {
          path: '/heroes/:id',
          name: 'heroesEdit',
          component: HeroCreate,
          props: true
        },
        {
          path: '/articles/creat',
          name: 'articlesCreat',
          component: ArticleCreate
        },
        {
          path: '/articles/list',
          name: 'articlesList',
          component: ArticleList
        },
        {
          path: '/articles/:id',
          name: 'articlesEdit',
          component: ArticleCreate,
          props: true
        },
        {
          path: '/ads/creat',
          name: 'adsCreat',
          component: ADCreate
        },
        {
          path: '/ads/list',
          name: 'adsList',
          component: ADList
        },
        {
          path: '/ads/:id',
          name: 'adsEdit',
          component: ADCreate,
          props: true
        },
        {
          path: '/users/creat',
          name: 'usersCreat',
          component: UserCreate
        },
        {
          path: '/users/list',
          name: 'usersList',
          component: UserList
        },
        {
          path: '/users/:id',
          name: 'usersEdit',
          component: UserCreate,
          props: true
        }
      ]
    },

  ]
})