import { Request, Response } from 'express'
import "reflect-metadata"
import { controller, get, post } from '../decorator'
import { Result, getResponseData } from '../Utils/util'


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
        const result: Result<boolean> = getResponseData(isLogin)
        res.json(result)
    }

    @post('/login')
    login(req: BodyRequest, res: Response): void {
        console.log('--- go to /login ---');

        const { password } = req.body
        const isLogin = LoginController.isLogin(req)
        if (isLogin) {
            const result: Result<boolean> = getResponseData(false, "already logged in")
            res.json(result)
        } else {
            if (password === '123' && req.session) {
                req.session.login = true
                const result: Result<boolean> = getResponseData(true)
                res.json(result)
            } else {
                const result: Result<boolean> = getResponseData(false, "fail to login")
                res.json(result)
            }
        }
    }
    @get('/logout')
    logout1(req: BodyRequest, res: Response): void {
        console.log('router-get-/api/logout');
        if (req.session) {
            req.session.login = undefined
        }
        const result: Result<boolean> = getResponseData(true)
        res.json(result)

    }

}