import { Context, Scenes } from 'telegraf'
import { MyContext } from '../..'
import { backKeyboard, mainKeyboard, resultKeyboard } from '../utils/keyboard'
import FlibustaService from '../services/flibustaService'

const flibusta = new FlibustaService()

const search = new Scenes.BaseScene<MyContext>('Search')

search.enter(async (ctx: Context) => {
  ctx.reply('Какую книгу ищем?', backKeyboard)

  console.log(ctx.from)
})

search.hears('Назад', (ctx) => {
  ctx.scene.leave()

  ctx.reply('Что дальше?', mainKeyboard)
})

search.on('text', async (ctx) => {
  const searchText = ctx.message.text

  await ctx.reply(`Ищем книги по запросу ${searchText}`)

  const result = await flibusta.getSearchResult(searchText)

  console.log('rr', result)

  if (result && result.length) {
    await ctx.reply('Результаты поиска:', resultKeyboard(result))
  } else {
    ctx.reply('Что-то пошло не так')
  }
})

search.action(/book/, (ctx) => {
  const data = ctx.callbackQuery.data

  console.log('action', data)
})

export default search
