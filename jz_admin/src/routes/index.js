
import index from "../components/index";
import List from "../components/List";
import Me from "../components/Me";
import Login from "../components/Login";
import Add from "../components/Add";
import AccountSet from "../components/AccountSet";

import Admin from "../components/admin";

import Vue from "vue"

import VueRouter from "vue-router"
// 路由组件
Vue.use(VueRouter);

// const index = import("../components/index")
// const List = import("../components/List")
// const Me = import("../components/Me")
// const Login = import("../components/Login")
// const Add = import("../components/Add")


const router = new VueRouter({
    routes:[
        {
            path: "", redirect: "/index"
        },
        { path: "/index", component: index,
            meta:{
                title:"小冰记账",
                showTabbar:true,
                requiresAuth: true,
            } 
        },
        { path: "/me", component: Me ,
            meta: {
                title: "个人页面",
                requiresAuth: true,
                showTabbar: true,
            }
        },
        {
            path: "/account-set", component: AccountSet,
            meta: {
                title: "账户设置",
                requiresAuth: true,
                showTabbar: false,
                showBack: true,
            }
        },
        {
            path: "/add", component: Add,
            meta: {
                title: "添加",
                requiresAuth: true,
                showTabbar: false,
                showBack:true,
            }
        },
        { path: "/list", component: List ,
            meta: {
                title: "列表",
                requiresAuth: true
            }
        },
        { path: "/login", component: Login, 
            meta: {
                title: "登录"
            }
        }
    ],
    mode:"history"
})

export default router;

