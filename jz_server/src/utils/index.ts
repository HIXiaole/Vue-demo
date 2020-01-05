
import * as crypto from "./crypto";
import { Cache } from "./cache";

class Utils {
    static generateID() {
        let ID: string = "";
        for (var i = 0; i < 6; i++) {
            // 向上取整 第一位不能有 0
            if (i == 0)
                ID += Math.ceil(Math.random() * 9);
            else
                ID += Math.floor(Math.random() * 10);
        }
        return ID;
    }

    static generateTimestamp(): number {
        return Date.now() / 1000;
    }

    static getTodayTimeFrame() {
        let date = new Date();
        let startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
        let endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59);
        console.log(123333333);
        return {
            endTime: endTime.getTime() / 1000,
            startTime: startTime.getTime() / 1000
        }
    }

    static typeof(param: any) {
        return /\[object (.+)\]/.exec(Object.prototype.toString.call(param))[1].toLowerCase();;
    }

    static Typeof(param: any) {
        return param.constructor.name.toLowerCase();
    }

    static delay(Millisecond: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, Millisecond);
        })
    }

    static isJson(str: string) {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == 'object') {
                    return true;
                }
            } catch (e) {
                console.log('error：' + str + '!!!' + e);
            }
            return false;
        }
        console.log('It is not a string!')
    }

    static clone(Obj: any, toObj: any) {
        this.each(Obj, (i, item) => {
            if (typeof item == "object") {
                toObj[i] = this.typeof(item) == "array" ? [] : {};
                this.clone(item, toObj[i]);
            } else {
                toObj[i] = item;
            }
        });
        return toObj;
    }

    static merge(toObj: any, fromObj: any) {
        if (Object.assign) {
            return Object.assign(toObj, fromObj);
        } else {
            for (var key in fromObj) {
                if (fromObj.hasOwnProperty(key)) {
                    toObj[key] = fromObj[key];
                }
            }
            return toObj;
        }
    }

    static isNum(ipt: any) {
        // 是不是数字类型 兼容字符串数字
        return (ipt !== '') && (ipt == +ipt) ? true : false;
    }

    static each(obj: any, handle: any) {
        if (this.typeof(obj) == "array") {
            for (var i = 0; i < obj.length; i++) {
                if (handle(i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (handle(key, obj[key]) === false) {
                    break
                }
            }
        }
    }

    /* 
     保证数据全部遍历完成在执行后续操作
     arr: 数组
     handle: 将数据传回去处理
     endFunc: 全部遍历完成回调
    */
    static forEach(arr: Array<any>, handle: any, endFunc: any) {

        let count = 0;
        let len = arr.length;
        function end() {
            count++;
            if (len == count) {
                endFunc(...arguments); //全部循环完成 并且回调里边的程序也都执行完成 在调用 回调 执行循环完成后的操作
            }
        }

        if (len == 0) {
            endFunc();
            return;
        }

        for (var i = 0; i < len; i++) {

            // function.length 获取函数参数个数
            if (handle.length == 2) {
                handle(arr[i], end)
            }
            else if (handle.length == 3) {
                handle(arr[i], i, end)
            }
            else if (handle.length == 4) {
                handle(arr[i], i, arr, end)
            }
        }
    }
}

export {
    Utils,
    crypto,
    Cache,
}