const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const handlerHtml = (html)=>{
    const array = !!html.children ? html.children:[]
    array.map(e=>{
        console.log(e)
        handlerHtml(e)
    })
}

const crawler = async () => {
    
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()
    
    await page.goto('http://example.com')
    const html = await page.content()

    const $ = cheerio.load(html);

    
    

    await browser.close()
    return $._root
}

crawler()
    .then((value)=>{
        handlerHtml(value)
    })
    .catch(e=>{
        console.error(e)
    })