import { NextFunction, Request, Response, Router } from 'express'
import 'reflect-metadata'
import { controller, get, post } from './decorator'
import { getResponseData } from '../Utils/util'

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined }
}

@controller
class LoginController {
    @get("/")
    home(req: BodyRequest, res: Response) {
        console.log('get - /');

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
    }

    @post('/login')
    login(req: BodyRequest, res: Response) {
        res.send('login is running')
    }

    @get('/logout')
    logout(req: BodyRequest, res: Response) {
        if (req.session) {
            req.session.login = undefined
        }
        res.json(getResponseData(true))

    }
}