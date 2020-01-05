import "reflect-metadata";
import { createConnection } from 'typeorm';

import { App } from "./app";

// 数据库连接
createConnection().then(async connection => {

    // 服务端启动
    App.start();

    // console.log("1111111111111");    



}).catch(error => console.log(error));
