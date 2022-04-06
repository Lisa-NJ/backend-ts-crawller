import { Request, Response } from 'express'
import "reflect-metadata"
import { controller, get, post } from '../decorator'
import { getResponseData } from '../Utils/util'

export interface BodyRequest extends Request {
    body: { [key: string]: string | undefined }
}

@controller('/api')
export class LoginController {
    static isLogin(req: BodyRequest): boolean {
        return !!(req.session ? req.session.login : false)
    }

    @get('/isLogin')
    isLogin(req: BodyRequest, res: Response): void {
        const isLogin = LoginController.isLogin(req)
        res.json(getResponseData(isLogin))
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
    logout1(req: BodyRequest, res: Response): void {
        console.log('router-get-/api/logout');
        if (req.session) {
            req.session.login = undefined
        }
        res.json(getResponseData(true))

    }

}