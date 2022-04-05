import { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { controller, get, use } from './decorator'
import { getResponseData } from '../Utils/util'
import DellAnalyzer from '../Utils/analyzer'
import Crawller from '../Utils/crawller'

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined }
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, 'please login in first!'))
  }
}

@controller
class CrawllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: BodyRequest, res: Response) {
    const secret = "secretKey"
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

    const analyzer = DellAnalyzer.getInstance()
    new Crawller(url, analyzer)

    res.json(getResponseData(true))
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response) {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'utf-8')
      //res.json(JSON.parse(result)) //\n shown on the page 
      res.json(getResponseData(JSON.parse(result)))
    } catch (e) {
      res.json(getResponseData(null, 'content fail'))
    }

  }
}