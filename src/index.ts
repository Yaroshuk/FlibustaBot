/**/
import 'dotenv/config'
import { Telegraf, Scenes, session } from 'telegraf'
import { start, search } from './scenes'
import { IMyContext } from './types'
import { mainKeyboard } from './utils/keyboard'

function main() {
  const bot = new Telegraf<IMyContext>(process.env.TM_TOKEN!)

  const stage = new Scenes.Stage<IMyContext>([start, search], { ttl: 10 })

  bot.use(session())
  bot.use(stage.middleware())

  bot.start((ctx) => ctx.scene.enter('Start'))

  bot.hears('Искать', (ctx) => ctx.scene.enter('Search'))

  bot.hears('Назад', (ctx) => {
    ctx.reply('Что дальше?', mainKeyboard)
  })

  bot.launch()

  console.log('connected')
}

main()
