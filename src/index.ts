import express from 'express'
// var bodyParser = require('body-parser') // commonJS 语法
import bodyParser from 'body-parser' // ts 支持的 import
import cookieSession from 'cookie-session'
import { router } from './router'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
    name: 'session',
    keys: ['teacher dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(router)

app.listen(7001, () => {
    console.log('which server is running on 7001?')
})    