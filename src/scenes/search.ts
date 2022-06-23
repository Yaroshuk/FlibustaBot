import { Context, Scenes } from 'telegraf'
import { MyContext } from '../..'
import { backKeyboard, mainKeyboard } from '../utils/keyboard'

const search = new Scenes.BaseScene<MyContext>('Search')

search.enter(async (ctx: Context) => {
  ctx.reply('Какую книгу ищем?', backKeyboard)

  console.log(ctx.from)
})

search.hears('Назад', (ctx) => {
  ctx.scene.leave()

  ctx.reply('Что дальше?', mainKeyboard)
})

search.on('text', (ctx) => {
  ctx.reply(`Вы искали ${ctx.message.text}`)
})

export default search
