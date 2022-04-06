import { Request, Response } from 'express'
import "reflect-metadata"
import { controller, get, post } from '../decorator'
import { getResponseData } from '../Utils/util'

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined }
}

@controller('/')
export class LoginController {
    static isLogin(req: BodyRequest): boolean {
        return !!(req.session ? req.session.login : false)
    }

    @post('/login')
    login(req: BodyRequest, res: Response): void {
        console.log('--- go to /login ---');

        const { password } = req.body
        const isLogin = LoginController.isLogin(req)
        if (isLogin) {
            res.json(getResponseData(false, "already logged in"))
        } else {
            if (password === '123' && req.session) {
                req.session.login = true
                res.json(getResponseData(true))
            } else {
                res.json(getResponseData(false, "fail to login"))
            }
        }
    }

    @get('/logout')
    logout(req: BodyRequest, res: Response): void {
        if (req.session) {
            req.session.login = undefined
        }
        res.json(getResponseData(true))

    }

    @get('/')
    home(req: BodyRequest, res: Response): void {
        console.log('congratulations! you are here get - /');

        const isLogin = LoginController.isLogin(req)
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
    }
}