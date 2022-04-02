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
    res.send(`
    <html>
        <body>
            <form method='post' action='/getData'>
            <input type='password' name='password'>
            <button>submit</button>
        </body>
    </html>
    `)
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
        res.send(`${req.teacherName} password Error!`)
    }
})

export default router