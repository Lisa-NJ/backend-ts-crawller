// ts -> .d.ts 类型定义文件 -> js

import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

export interface Analyzer {
    analyze: (html: string, filePath: string) => string
}

export default class Crawller {

    private filePath = path.resolve(__dirname, '../../data/course.json')

    private async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }

    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }

    private async initSpiderProcess() {
        const html = await this.getRawHtml()
        const content = this.analyzer.analyze(html, this.filePath)
        this.writeFile(content)
    }
    constructor(private url: string, private analyzer: Analyzer) {
        this.initSpiderProcess();
    }
}

