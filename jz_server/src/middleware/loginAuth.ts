

import * as jwt from "jsonwebtoken";
import * as Koa from "koa";
import { Conf } from "../config";
export class LoginAuth {

    static set() {
        return async (ctx:Koa.ParameterizedContext, next) => {
    
            let token = ctx.headers.jsonwebtoken;
            if (ctx.url != "/login"){
                let verify = true;
                try {
                    
                    jwt.verify(token ? token : "", Conf.TokenSecret)
                    
                } catch (error) {

                    verify=false
                }
                if (!verify){
                    // 未登录下发
                    ctx.body = { code: 2000 };
                    return 
                }
                return await next()
            }
            await next()
        }
    }

}


/* 
token 原理
后台创建 token 下发给前台
后台维护一个 token 对象
{
    "32位字符token":data数据
}

前台请求携带 token
后台判断 token 在对象池中是否存在
存在的话用密钥反向解密得到的数据是否跟对象[key]的data相同

*/