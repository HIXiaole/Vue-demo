export class Utils {
    static deepCopy(obj) {
        if (typeof obj != "object") {
            return obj;
        }
        var result = Object.prototype.toString.call(obj) == "[object Array]" ? [] : {};
        for (var k in obj) {
            result[k] = this.deepCopy(obj[k]);
        }
        return result;
    }



    static dataFormat(milliseconds, type = "Y-M-D h:m:s") {
        var dayObj = {
            "1": "星期一",
            "2": "星期二",
            "3": "星期三",
            "4": "星期四",
            "5": "星期五",
            "6": "星期六",
            "0": "星期日"
        }
        var date = new Date(Number(milliseconds));
        var timeObj = {
            "Y": date.getFullYear(),
            "M": (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
            "D": date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate(),
            "h": date.getHours(),
            "m": date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes(),
            "s": date.getSeconds().toString().length == 1 ? "0" + date.getSeconds() : date.getSeconds(),
            "d": dayObj[date.getDay()]
        }

        for (let k in timeObj) {
            type = type.replace(k, timeObj[k])
        }
        return type
    }

}