import express from 'express'
import router from './router'

const app = express()
app.use(router)

app.listen(7001, () => {
    console.log('which server is running on 7001?')
})