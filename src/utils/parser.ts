import cheerio from 'cheerio'

export const parseSearchResult = async (data: string) => {
  const $ = await cheerio.load(data)

  const result = $('#main>ul')
    .last()
    .children()
    .map((index, elem) => ({
      title: $(elem).children('a').first().text(),
      src: $(elem).children('a').first().attr('href'),
      author: $(elem).children('a').last().text(),
    }))
    .get()

  return result
}

export const parseBookPage = async (data: string) => {
  const $ = await cheerio.load(data)

  const result: any = {}

  result.title = $('#main>h1').first().text()
  result.img = $('#main>img').first().text()
  result.post = $('#main>p').first().text()
  result.author = {
    name: $('#main>a').first().text(),
    link: $('#main>a').first().attr('href'),
  }

  return result
}
