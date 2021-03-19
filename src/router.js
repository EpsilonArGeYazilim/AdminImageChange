import Vue from "vue"
import VueRouter from "vue-router"


import Login from "./components/Login.vue"



import store from "./store"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        component: Homepage,
        beforeEnter(to, from, next) {


            if (store.getters.isLogin) {
                next()
            } else {
                next("/login")
            }
        }

    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter(to, from, next) {

            if (store.getters.isLogin) {
                next("/")
            } else {
                next()
            }
        }

    },


];
export const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes
});