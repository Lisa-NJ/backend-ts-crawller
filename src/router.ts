import { Router, Request, Response } from 'express'
import DellAnalyzer from './dellAnalyzer'
import Crawller from './crawller'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, I am express')
})

router.get('/getData', (req: Request, res: Response) => {

    const secret = 'secretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

    const analyzer = DellAnalyzer.getInstance()
    new Crawller(url, analyzer)

    res.send('getDate success')
})

export default router