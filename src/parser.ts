import axios from "axios"
import cheerio from "cheerio"

class Parser {
  static instance: Parser

  private url:string = process.env.URL ?? ''
  private searchUrl:string = process.env.SEARCH_URL ?? ''

  constructor() {
    if (Parser.instance) {
      return Parser.instance
    }

    Parser.instance = this
  }

  async search(search: string) {
    const response = await axios(this.searchUrl, {
      params: {
        ask: search.trim()
      }
    });

    if (response.status === 200) {
      console.log(this.getResult(response.data))
    }
    // console.log(data.status)
  }

  async getResult(data: string) {
    const $ = cheerio.load(data)

    const result = $('#main>ul').last().children().map((index, elem) => ({
      title: $(elem).children('a').first().text(),
      src: $(elem).children('a').first().attr('href'),
      author: $(elem).children('a').last().text()
    })).get()

    return result
  }
}

export default Parser