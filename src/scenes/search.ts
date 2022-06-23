import { Context, Scenes } from 'telegraf'
import { MyContext } from '../..'

const search = new Scenes.BaseScene<MyContext>('Search')

search.enter(async (ctx: Context) => {
  ctx.reply('Какую книгу ищем?')

  console.log(ctx.from)
})

search.on('text', (ctx) => {
  ctx.reply(`Вы искали ${ctx.message.text}`)
})

export default search
