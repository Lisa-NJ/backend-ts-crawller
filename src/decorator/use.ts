import 'reflect-metadata'
import { RequestHandler } from 'express'
import { CrawllerController, LoginController } from '../controller'

// factory
export function use(middleware: RequestHandler) {
  // return a real decorator
  return function (target: CrawllerController | LoginController, key: string) {
    const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
    originMiddlewares.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
    console.log('...use factory ...', originMiddlewares, target, key);
  }
}

