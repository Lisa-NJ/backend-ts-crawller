import express from 'express'
import router from './router'
// var bodyParser = require('body-parser') // commonJS 语法
import bodyParser from 'body-parser' // ts 支持的 import

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

app.listen(7001, () => {
    console.log('which server is running on 7001?')
})