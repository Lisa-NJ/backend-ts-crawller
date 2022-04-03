import { Router, Request, Response } from 'express'
import DellAnalyzer from './dellAnalyzer'
import Crawller from './crawller'
import fs from 'fs'
import path from 'path'

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
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

router.get('/logout', (req: Request, res: Response) => {
    console.log('router--logout')

    if (req.session) {
        req.session.login = undefined
    }
    res.redirect('/')
})

router.post('/login', (req: RequestWithBody, res: Response) => {
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

router.get('/getData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        const secret = 'secretKey'
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

        const analyzer = DellAnalyzer.getInstance()
        new Crawller(url, analyzer)

        res.send('getDate success!')
    } else {
        res.send('Please log in first!')
    }
})

router.get('/showData', (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        try {
            const position = path.resolve(__dirname, '../data/course.json')
            const result = fs.readFileSync(position, 'utf-8')
            //res.json(JSON.parse(result)) //\n shown on the page 
            res.json(JSON.parse(result))
        } catch (e) {
            res.send("no content yet")
        }
    } else {
        res.send('please login in first!')
    }
})

export default router