import { NextFunction, Request, Response, Router } from 'express'
import 'reflect-metadata'
import { controller, get } from './decorator'

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined }
}

@controller
class LoginController {
    @get('/login')
    login() { }

    @get('/')
    home(req: BodyRequest, res: Response) {
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
}