import 'reflect-metadata'
import { RequestHandler } from 'express'
import { CrawllerController, LoginController } from '../controller'

// factory
export function use(middleware: RequestHandler) {
  // return a real decorator
  return function (target: CrawllerController | LoginController, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}

