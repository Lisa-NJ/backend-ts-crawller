import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowller'

interface Course {
    title: string,
    count: number
}
interface CourseResult {
    time: number,
    data: Course[]
}
interface Content {
    [propName: number]: Course[]
}

export default class DellAnalyzer implements Analyzer {
    public analyze(html: string, filePath: string) {
        const courseInfo = this.getCouseInfo(html)
        return this.generateJsonContent(courseInfo, filePath)
    }

    private getCouseInfo = (html: string) => {
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc')
            const title = descs.eq(0).text()
            const count = parseInt(descs.eq(1).text().split('：')[1])
            courseInfos.push({ title, count })
        })
        return {
            time: (new Date()).getTime(),
            data: courseInfos
        }
    }


    private generateJsonContent(courseInfo: CourseResult, filePath: string) {
        let fileContent: Content = {}

        // get the existing course info already in the file
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        }
        // + new info - courseInfo
        fileContent[courseInfo.time] = courseInfo.data

        return JSON.stringify(fileContent)
    }
}