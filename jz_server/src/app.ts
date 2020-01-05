import { CommonService } from './services/CommonService';


import * as Koa from "koa";
import * as KoaRouter from "koa-router";
// import { Cors } from './middleware/cors';
import { ErrorHandle } from './middleware/errorHandle';

import * as cors from "koa2-cors";
import * as BodyParser from "koa-bodyparser"
import * as jwt from "jsonwebtoken";
// import * as KoaSession from "koa-session"
// import { historyApiFallback } from "koa2-connect-history-api-fallback";
const app = new Koa();
const router = new KoaRouter();

// // session
// app.keys = ['some secret hurr'];

// /* session 官方配置 */
// const CONFIG = {
//     key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//     /** (number || 'session') maxAge in ms (default is 1 days) */
//     /** 'session' will result in a cookie that expires when session/browser is closed */
//     /** Warning: If a session cookie is stolen, this cookie will never expire */
//     maxAge: 86400000,
//     autoCommit: true, /** (boolean) automatically commit headers (default true) */
//     overwrite: true, /** (boolean) can overwrite or not (default true) */
//     httpOnly: true, /** (boolean) httpOnly or not (default true) */
//     signed: true, /** (boolean) signed or not (default true) */
//     rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//     renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };

// /*  */
// app.use(KoaSession(CONFIG, app));



import { BaseContext } from 'koa';
import { LoginAuth } from './middleware/loginAuth';
import { Conf } from './config';


export class App {

    

    static start(){

        
        // 统一错误处理，包装错误返回客户端
        app.use(ErrorHandle.set())
        
        // 解决 vue 直接刷新 not found 问题
        // 全部转发到 index.html 
        // app.use(historyApiFallback());

        // 解决跨域中间件
        app.use(cors());

        // post数据处理
        app.use(BodyParser());

        // 登录拦截验证
        app.use(LoginAuth.set())

        // 使用 router组件
        app
            .use(router.routes())
            .use(router.allowedMethods());
   

        // 登录请求
        router.post("/login", async ctx => {
            const account = ctx.request.body.account;
            const password = ctx.request.body.password;

            let uInfo = await CommonService.getUserInfo(account);

            if (password != uInfo.password){
                ctx.body = "密码错误无法登录";
                return
            }
            // console.log(uInfo);
            let token = jwt.sign({
                exp:Math.floor(Date.now() / 1000) + 86400,
                data:uInfo
            }, Conf.TokenSecret)
            ctx.body = { code: 200, userId: uInfo.id, token};
        })

        // 添加记录
        router.post("/add-record", async ctx => {
            let records = ctx.request.body.records;
            let userId = ctx.request.body.userId;
            
            // 交给数据库服务层 处理
            await CommonService.addRecord(records, userId);
            ctx.body = { code: 200 };
            
        })


        // 获取列表数据请求
        router.get("/getRecordList", async ctx => {
            let userId = ctx.query.userId;
            let accountType = ctx.query.AccountType;
            let startDatetime = ctx.query.startDateTime;
            let pageListCount = ctx.query.pageListCount;
            let pageNumber =ctx.query.pageNumber;

            ctx.body = { code: 200, result: await CommonService.getRecordList(userId, accountType, startDatetime, pageListCount, pageNumber) };
        })


        router.post("/account-set", async ctx => {
            let accountInfo = ctx.request.body.accountInfo;
            let userId = ctx.request.body.userId;

            console.log(accountInfo);

            let data = [];

            for(let key in accountInfo){
                data.push({
                    userId:userId,
                    AccountType:key,
                    num:accountInfo[key].number
                })
            }

            // 
            await CommonService.setAccountInfo(data, userId);
            ctx.body = { code: 200 };

        })

        router.get("/account-info", async ctx => {
            console.log(ctx.params)
            ctx.body = { code: 200, result: await CommonService.getAccountInfo(ctx.query.userId) };
        })


        app.listen(8081);

        console.log("listen 8081");
    }

}