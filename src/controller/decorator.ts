import { RequestHandler, Router } from 'express'

export const router = Router()

enum Method {
    get = 'get',
    post = 'post'
}

// factory
export function use(middleware: RequestHandler) {
    // return a real decorator
    return function (target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}

export function controller(target: any) {
    for (let key in target.prototype) {
        const path = Reflect.getMetadata('path', target.prototype, key)
        const method: Method = Reflect.getMetadata('method', target.prototype, key)
        const middleware = Reflect.getMetadata('middleware', target, key)
        console.log(path, method, middleware);

        const handler = target.prototype[key]
        if (path && method && handler) {
            if (middleware) {
                router[method](path, middleware, handler)
            } else {
                router[method](path, handler)
            }

        }
    }
}

function getRequestDecorator(method: string) {
    return function (path: string) {
        return function (target: any, key: string) {
            console.log(`----${method} decorator`);

            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', method, target, key)
        }
    }
}

export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')