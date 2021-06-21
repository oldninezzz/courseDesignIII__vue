import Content from "../pages/Content";
import VueRouter from "vue-router";
import Vue from "vue";
import axios from "axios";
Vue.prototype.axios = axios
import Navbar from "../components/navbar";
import Login from '../pages/login/login'
import UserList from '../pages/List'
import NotFound from "../pages/NotFound";
import HelloWorld from "../pages/HelloWorld";
import Profile from "../pages/Profile";
import Register from "../pages/register/register";
import CustomerService from "../pages/customerManage/customerService";
import User from "../pages/userManage/user"
import Total from "../pages/domainPage/Total";
import Search from "../pages/search/search";
import LeaveMessage from "../pages/leaveMessage/LeaveMessage";

Vue.use(VueRouter)


const router = new VueRouter({
  mode: "history",
  routes: [
    {path: "/", redirect: "/login"},
    {path: "/login", name: 'UserLogin', component: Login},
    {path: "/register", name: 'UserRegister', component: Register},
    {path: "/main", name: "mainPage", component: Navbar, props: true,
      children:[
        {path: "/total", name: "totalDomain", component: Total},
        {path: "/user", name: "user", component: User},
        {path: "/search", name: "search", component: Search},
        {path: "/leavemessage", name: "leavemessage", component: LeaveMessage}
      ]
    },
    {path: '*', component: NotFound}
  ]
})
router.beforeEach(((to, from, next) => {
  if(to.path === '/login' || to.path === '/register'){
    next();
  }
  else{
    let token = window.sessionStorage.getItem("token");
    if (token === null || token === '' || token === undefined){
      next('/login');
    }
    else{
      next();
    }
  }
}));
export default router
