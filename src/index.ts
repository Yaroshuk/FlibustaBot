/**/
import 'dotenv/config'
import { Telegraf, session, Scenes, Context } from 'telegraf'
import { start, search } from './scenes'
import { mainKeyboard } from './utils/keyboard'

export interface MyContext extends Context {
  // will be available under `ctx.myContextProp`
  myContextProp: string

  // declare scene type
  scene: Scenes.SceneContextScene<MyContext>
}

function main() {
  const bot = new Telegraf<MyContext>(process.env.TM_TOKEN!)

  const stage = new Scenes.Stage<MyContext>([start, search], { ttl: 10 })

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
