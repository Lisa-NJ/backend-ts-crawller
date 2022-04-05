import { CrawllerController, LoginController } from '../controller'

export enum Methods {
  get = 'get',
  post = 'post'
}

export function getRequestDecorator(method: Methods) {
  return function (path: string) {
    return function (target: CrawllerController | LoginController, key: string) {
      console.log(`----${method} decorator`);

      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', method, target, key)
    }
  }
}


export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)