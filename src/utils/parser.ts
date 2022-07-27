import cheerio from 'cheerio'
import { getParamFromURL } from '.'

export const parseSearchResult = async (data: string) => {
  const $ = await cheerio.load(data)

  const result: any = {}

  result.books = $('#main>ul')
    .last()
    .children()
    .map((_index, elem) => ({
      title: $(elem).children('a').first().text(),
      src: $(elem).children('a').first().attr('href'),
      author: $(elem).children('a').last().text(),
    }))
    .get()

  result.pagination = await parsePagination(data)

  return result
}

export const parsePagination = async (data: string) => {
  const $ = await cheerio.load(data)

  const result: any = {}

  result.current = $('.pager-current').first().text() || '1'

  const latsPageLink = $('.pager-last>a').first().attr('href')

  if (!latsPageLink) {
    result.last = '1'
    return result
  }

  result.last = getParamFromURL(latsPageLink, 'page')

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
