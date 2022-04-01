import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, I am express')
})

router.get('/getData', (req: Request, res: Response) => {
    res.send('bye')
})

export default router