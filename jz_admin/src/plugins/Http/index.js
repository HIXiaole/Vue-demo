import axios from "axios";
import { Config } from "../../config/index";
import router from "../../routes";


export class Http {
    static install(Vue, options) {

        axios.defaults.baseURL = Config.api;
        /* 拦截请求 header 携带token */
        axios.interceptors.request.use(function (config) {
            let token = localStorage.getItem("token");
            config.headers["jsonwebtoken"] = token;
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            // Do something with response data
            let { data } = response;
            if( data.code == 2000){
                // token 验证失败
                localStorage.removeItem("token")
                localStorage.removeItem("userInfo")
                router.push("/login");
            } else
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        })

        Vue.prototype.$http = axios;
    }
}