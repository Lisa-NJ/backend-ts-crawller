// ts -> .d.ts 类型定义文件 -> js

import superagent from 'superagent'
import cheerio from 'cheerio'


interface Course {
    title: string,
    count: number
}

class Crowller {
    private secret = 'secretKey'
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`

    private rawHtml = ''

    getCouseInfo = (html: string) => {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(0).text()
            const count = parseInt(descs.eq(1).text().split('：')[1])
            console.log(title, count)
            courseInfos.push({ title, count })
        })
        const result = {
            time: (new Date()).getTime(),
            data: courseInfos
        }
    }

    async getRawHteml() {
        const result = await superagent.get(this.url)
        this.getCouseInfo(result.text)
    }

    constructor() {
        this.getRawHteml();
    }
}

const crowller = new Crowller()
