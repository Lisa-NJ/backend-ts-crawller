import { router } from '../router'
import { RequestHandler } from 'express';
import { Methods } from './request';

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    console.log('controller~~~~', target.prototype);

    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target, key)
      console.log('path --', path)
      console.log('method --', method)
      console.log('middileware --', middleware);

      const handler: any = target.prototype[key]
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        if (middleware) {
          router[method](fullPath, middleware, handler)
        } else {
          router[method](fullPath, handler)
        }

      }
    }
  }

}
