
const ERROR_MSG = {

}

const ERROR_CODE = {

}


// 自定义错误
export class CustomError extends Error {
    constructor(code, msg){
        super()
        this.code = code || 200;
        this.msg = msg || ERROR_MSG[code] || 'unknown error'
    }

    getCodeMsg  () {
        return {
            code: this.code,
            msg: this.msg
        }
    }
}

// 请求错误
export class HttpError extends CustomError {
    constructor(code, msg){
        super(code, msg);
    }
}

// 统一错误处理
export class ErrorHandle {
    static set(){
        return (ctx, next) => {
            return next().catch((err) => {
                let code = 500
                let msg = 'unknown error'
                if (err instanceof CustomError || err instanceof HttpError) {
                    const res = err.getCodeMsg()
                    ctx.status = err instanceof HttpError ? res.code : 200
                    code = res.code
                    msg = res.msg
                } else {
                    console.error('err', err)
                }
                ctx.body = {
                    code,
                    msg
                }
            })
        }
    }
}