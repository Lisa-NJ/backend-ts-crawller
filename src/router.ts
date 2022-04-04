import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import DellAnalyzer from './Utils/analyzer'
import Crawller from './Utils/crawller'

import { getResponseData } from './Utils/util'

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

const router = Router()

router.get('/', () => { })

router.get('/logout', (req: BodyRequest, res: Response) => {
    console.log('router--logout')

    if (req.session) {
        req.session.login = undefined
    }
    res.json(getResponseData(true))
})

router.post('/login', (req: BodyRequest, res: Response) => {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        res.json(getResponseData(false, '已经登陆过'))
    } else if (password === '123' && req.session) {
        req.session.login = true
        res.json(getResponseData(true))
    } else {
        res.json(getResponseData(false, 'login fail'))
    }
})

router.get('/getData', checkLogin, (req: Request, res: Response) => {
    const secret = 'secretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

    const analyzer = DellAnalyzer.getInstance()
    new Crawller(url, analyzer)

    res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
    try {
        const position = path.resolve(__dirname, '../data/course.json')
        const result = fs.readFileSync(position, 'utf-8')
        //res.json(JSON.parse(result)) //\n shown on the page 
        res.json(getResponseData(JSON.parse(result)))
    } catch (e) {
        res.json(getResponseData(null, 'content fail'))
    }
})

export default router