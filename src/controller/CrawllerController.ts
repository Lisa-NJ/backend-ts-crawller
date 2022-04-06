import fs from 'fs'
import path from 'path'
import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { get, use, controller } from '../decorator'
import { getResponseData, Result } from '../Utils/util'
import Analyzer from '../Utils/analyzer'
import Crawller from '../Utils/crawller'

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined }
}

interface CourseItem {
  title: string
  count: number
}

interface Data {
  [key: string]: CourseItem[]
}


const checkLogin = (req: BodyRequest, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : undefined)
  console.log('checkLogin middleware isLogin=', isLogin);
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData<boolean>(false, 'please login in first!'))
  }

}
const test = (req: BodyRequest, res: Response, next: NextFunction): void => {
  console.log('test middleware');
}

@controller('/')
export class CrawllerController {
  @get("/getData")
  @use(checkLogin)
  @use(test)
  getData(req: BodyRequest, res: Response): void {
    const secret = "secretKey"
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

    const analyzer = Analyzer.getInstance()
    new Crawller(url, analyzer)

    res.json(getResponseData<boolean>(true))
  }

  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'utf-8')
      //res.json(JSON.parse(result)) //\n shown on the page 
      res.json(getResponseData<Data>(JSON.parse(result)))
    } catch (e) {
      res.json(getResponseData<boolean>(false, 'content fail'))
    }

  }
}