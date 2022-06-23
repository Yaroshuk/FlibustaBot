import { Context, Scenes } from 'telegraf'
import { MyContext } from '..'

const start = new Scenes.BaseScene<MyContext>('Start')

start.enter(async (ctx: Context) => {
  await ctx.reply('Welcome')

  console.log(ctx.from)
})

export default start
