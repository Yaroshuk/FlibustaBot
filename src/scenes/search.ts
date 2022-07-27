// @ts-nocheck
import { Context, Scenes } from 'telegraf'
import { backKeyboard, mainKeyboard, resultKeyboard } from '../utils/keyboard'
import FlibustaService from '../services/flibustaService'
import { IMyContext } from '../types'

const flibusta = new FlibustaService()

const search = new Scenes.BaseScene<IMyContext>('Search')

search.enter(async (ctx: Context) => {
  ctx.reply('Какую книгу ищем?', backKeyboard)
})

search.hears('Назад', (ctx) => {
  ctx.scene.leave()

  ctx.reply('Что дальше?', mainKeyboard)
})

search.on('text', async (ctx) => {
  const searchText = ctx.message.text

  await ctx.reply(`Ищем книги по запросу ${searchText}`)

  const result = await flibusta.getSearchResult(searchText)

  if (result?.books && result?.books.length) {
    await ctx.reply('Результаты поиска:', resultKeyboard(result.books))
  } else {
    ctx.reply('Что-то пошло не так')
  }
})

search.action(/book/, async (ctx) => {
  const data = ctx.callbackQuery.data
  if (data) {
    const book = await flibusta.getBook(data.split('-')[1])
    if (book) {
      ctx.session.book = book
    }
  }
  console.log('action', data)
})

export default search
