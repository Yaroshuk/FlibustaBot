import { Markup } from 'telegraf'

export const mainKeyboard = Markup.keyboard([['Искать'], ['О боте', 'Контакты']])

export const backKeyboard = Markup.keyboard([['Назад']])

export const resultKeyboard = (books: Record<'title' | 'author' | 'src', string>[]) => {
  const result = books.map((item) =>
    Markup.button.callback(`${item.title} [${item.author}]`, `book-${item.src}`, false)
  )

  return Markup.inlineKeyboard(result, { columns: 1 })
}
