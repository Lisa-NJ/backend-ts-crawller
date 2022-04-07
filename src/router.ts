// import fs from 'fs'
// import path from 'path'
import { Router/* Request, Response*/ } from 'express'
// import { LoginController } from './controller'
// import { getResponseData } from './Utils/util'
// import { BodyRequest } from './controller'
// import Analyzer from './Utils/analyzer'
// import Crawller from './Utils/crawller'

export const router = Router()

// router.get('/api/isLogin', (req: Request, res: Response) => {
//   console.log('router-get-/api/isLogin');

//   const isLogin = LoginController.isLogin(req)
//   //res.json(getResponseData(isLogin'))
//   //res.send('我是后端来的')
//   res.json(getResponseData(isLogin))

// })

// router.get('/api/logout', (req: BodyRequest, res: Response) => {
//   console.log('router-get-/api/logout');
//   if (req.session) {
//     req.session.login = undefined
//   }
//   res.json(getResponseData(true))

// })
// router.get('/api/getData', (req: BodyRequest, res: Response) => {
//   console.log('router-get-/api/getData');
//   const secret = "secretKey"
//   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

//   const analyzer = Analyzer.getInstance()
//   new Crawller(url, analyzer)

//   res.json(getResponseData(true))

// })

// router.get('/api/showData', (req: BodyRequest, res: Response) => {
//   console.log('router-get-/api/showData');

//   try {
//     const position = path.resolve(__dirname, '../data/course.json')
//     const result = fs.readFileSync(position, 'utf-8')
//     res.json(getResponseData(JSON.parse(result)))
//   } catch (e) {
//     res.json(getResponseData(null, 'content fail'))
//   }

// })

// router.post('/api/login', (req: Request, res: Response) => {
//   console.log('--- go to /api/login ---');

//   const { password } = req.body
//   const isLogin = LoginController.isLogin(req)
//   if (isLogin) {
//     res.json(getResponseData(true))
//     console.log('already logged in');

//   } else {
//     if (password === '123' && req.session) {
//       req.session.login = true
//       res.json(getResponseData(true))
//       console.log('set log in status - true');

//     } else {
//       res.json(getResponseData(false, "fail to login"))
//       console.log('fail to login');
//     }
//   }
// })