/**/
import 'dotenv/config'
import { Telegraf, session, Scenes, Context } from 'telegraf'
import { start, search } from './scenes'
import mongoose from 'mongoose'

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

  bot.command('search', (ctx) => ctx.scene.enter('Search'))

  bot.launch()

  console.log('connected')
}

main()

// mongoose.connection.on('open', () => {
//   const bot = new Telegraf<MyContext>(process.env.TM_TOKEN!)

//   const stage = new Scenes.Stage<MyContext>([start], { ttl: 10 })

//   bot.use(session())
//   bot.use(stage.middleware())

//   bot.start((ctx) => ctx.scene.enter('Start'))

//   bot.hears('hi', (ctx) => ctx.reply('hi'))

//   bot.launch()

//   console.log('connected')
// })
