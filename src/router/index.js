import Vue from 'vue'
import VueRouter from 'vue-router'

// import Venue from '../views/Venue';
// import Detail from '../views/Detail';
// import Order from '../views/Order';
const Venue = () => import(/* webpackChunkName:"Venue_Detail_Order" */ '../views/Venue')
const Detail = () => import(/* webpackChunkName:"Venue_Detail_Order" */ '../views/Detail')
const Order = () => import(/* webpackChunkName:"Venue_Detail_Order" */ '../views/Order')

import Login from '../views/Login';
import Register from '../views/Register';

// import Game from '../views/Game';
// import GameDetail from '../views/GameDetail';
// import AddActive from '../views/AddActive';
// import MyGame from '../views/MyGame';
const Game = () => import(/* webpackChunkName:"game_item" */ '../views/Game')
const GameDetail = () => import(/* webpackChunkName:"game_item" */ '../views/GameDetail')
const AddActive = () => import(/* webpackChunkName:"game_item" */ '../views/AddActive')
const MyGame = () => import(/* webpackChunkName:"game_item" */ '../views/MyGame')


import About from '../views/About';
import Find from '../views/Find';
import Search from '../views/Search';
import SelectVenue from '../views/SelectVenue';

import CreateFriendMsg from '../views/CreateFriendMsg';

import BMap from '../views/BMap';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/venue'
  },
  {
    path: '/venue',
    name: 'venue',
    component: Venue
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/find',
    name: 'find',
    component: Find
  },
  {
    path: '/game',
    name: 'game',
    component: Game
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/my_game',
    name: 'my_game',
    component: MyGame
  },
  {
    path: '/add_active',
    name: 'add_active',
    component: AddActive
  },
  {
    path: '/select_venue',
    name: 'select_venue',
    component: SelectVenue
  },
  {
    path: '/game_detail',
    name: 'game_detail',
    component: GameDetail
  },
  {
    path: '/create_friend_msg',
    name: 'create_friend_msg',
    component: CreateFriendMsg
  },
  {
    path: '/map',
    name: 'map',
    component: BMap
  },
 
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{

  // 如果访问的是login,可以直接访问
  // 如果访问其他路由,token是否存在, 不存在,跳转到登录页;
 
  if(to.path == "/login")  return  next();

  let tokenStr = window.sessionStorage.getItem('token');
  if(to.meta.requireAuth &&!tokenStr){
      return next("/login");
  }
  
  next();

})

export default router
