import { router } from '../router'
import { RequestHandler } from 'express';
import { Methods } from './request';

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    console.log('controller~~~~', target.prototype);

    for (let key in target.prototype) {
      console.log('\tsuccessfully fixed...');

      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target, key)
      console.log('\tpath --', path)
      console.log('\tmethod --', method)
      console.log('\tmiddileware --', middlewares);

      const handler: any = target.prototype[key]
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }

      }
    }
  }
}
