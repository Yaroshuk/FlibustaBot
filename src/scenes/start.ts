import { Context, Scenes } from 'telegraf'
import { IMyContext } from '../types'
import { mainKeyboard } from '../utils/keyboard'

const start = new Scenes.BaseScene<IMyContext>('Start')

start.enter(async (ctx: Context) => {
  await ctx.reply(
    'Привет. Это бот для поиска книг с сайта Flibusta. Воспользуйся меню снизу или напиши "Искать" чтобы начать',
    mainKeyboard
  )
})

export default start
