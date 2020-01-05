import Vue from 'vue'
import 'mint-ui/lib/style.css'
import "./assets/css/base.css"
import "./assets/font/font.css"
import Mint from 'mint-ui';
import App from './App.vue'

import "element-ui/lib/theme-chalk/table.css";
import "element-ui/lib/theme-chalk/table-column.css";
import "element-ui/lib/theme-chalk/pagination.css";
import { Table ,TableColumn, Pagination} from "element-ui";

import { Toast } from "mint-ui";

import { ActionSheet } from "./plugins/ActionSheet/index"
import { Http } from "./plugins/Http"


// 加载路由配置文件
import router from "./routes";

// MintUI
Vue.use(Mint);

Vue.use(Table);
Vue.use(TableColumn);

/* 自定义插件 */
Vue.use(ActionSheet);
Vue.use(Http);

// 生产阶段不需要提示
Vue.config.productionTip = false;
Vue.config.debug = true;

// 是否登录拦截
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	const requiresAuth = to.meta.requiresAuth;
	// 判断该路由是否需要登录权限
	if (requiresAuth && !window.localStorage.getItem('token')) {
		next('/login')
	} else {
		next()  // 确保一定要有next()被调用
	}
})


// 初始化项目
const app = new Vue({
	router,
	render: h => h(App),
}).$mount('#app')


