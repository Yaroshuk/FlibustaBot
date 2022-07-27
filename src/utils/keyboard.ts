import { Markup } from 'telegraf'
import { ISearchResult, Pagination } from '../types'

export const mainKeyboard = Markup.keyboard([['Искать'], ['О боте', 'Контакты']])

export const backKeyboard = Markup.keyboard([['Назад']])

export const resultKeyboard = (books: ISearchResult[], pagination: Pagination) => {
  const result = books.map((item) => {
    return [Markup.button.callback(`${item.title} [${item.author}]`, `book-${item.src}`, false)]
  })

  return Markup.inlineKeyboard([...result, getPaginationButtons(pagination)])
}

const getPaginationButtons = (pagination: Pagination) => {
  if (pagination.last === 1) return []

  if (pagination.last <= 5) {
    return new Array(pagination.last).fill(0).map((elem, index) => {
      const title = index + 1 === pagination.current ? `[${++index}]` : `${++index}`
      return Markup.button.callback(title, `${++index}`)
    })
  }

  const result = [
    Markup.button.callback('<<', '<<'),
    Markup.button.callback('<', '<'),
    Markup.button.callback(`${pagination.current}`, `${pagination.current}`),
    Markup.button.callback('>', '>'),
    Markup.button.callback('>>', '>>'),
  ]

  return result
}
