import { Router, Request, Response, NextFunction } from 'express'
import DellAnalyzer from './Utils/analyzer'
import Crawller from './Utils/crawller'
import fs from 'fs'
import path from 'path'

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined }
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        next()
    } else {
        res.send('please login in first!')
    }
}

const router = Router()

router.get('/', (req: BodyRequest, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined

    if (isLogin) {
        res.send(`
        <html>
            <body>
                <a href='/getData'>Get Data</a>
                <a href='/showData'>Show Data</a>
                <a href='/logout'>Logout</a>
            </body>
        </html>
      `)
    } else {
        res.send(`
            <html>
                <body>
                    <form method='post' action='/login'>
                    <input type='password' name='password'>
                    <button>Login</button>
                </body>
            </html>
          `)
    }
})

router.get('/logout', (req: BodyRequest, res: Response) => {
    console.log('router--logout')

    if (req.session) {
        req.session.login = undefined
    }
    res.redirect('/')
})

router.post('/login', (req: BodyRequest, res: Response) => {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        res.send('already logined in')
    } else if (password === '123' && req.session) {
        req.session.login = true
        res.send('login success!')
    } else {
        res.send('login fail!')
    }
})

router.get('/getData', checkLogin, (req: Request, res: Response) => {
    const secret = 'secretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

    const analyzer = DellAnalyzer.getInstance()
    new Crawller(url, analyzer)

    res.send('getDate success!')

})

router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
    try {
        const position = path.resolve(__dirname, '../data/course.json')
        const result = fs.readFileSync(position, 'utf-8')
        //res.json(JSON.parse(result)) //\n shown on the page 
        res.json(JSON.parse(result))
    } catch (e) {
        res.send("no content yet")
    }
})

export default router