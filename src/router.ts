import { Router, Request, Response } from 'express'
import DellAnalyzer from './dellAnalyzer'
import Crawller from './crawller'

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
    } else {
        if (password === '123' && req.session) {
            req.session.login = true
            res.send('login success!')
        } else {
            res.send('login fail!')
        }
    }

})

router.post('/getData', (req: RequestWithBody, res: Response) => {
    const { password } = req.body
    if (password === '123') {
        const secret = 'secretKey'
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

        const analyzer = DellAnalyzer.getInstance()
        new Crawller(url, analyzer)

        res.send('getDate success!')
    } else {
        res.send('password Error!')
    }
})

export default router