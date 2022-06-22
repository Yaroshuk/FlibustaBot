import { Context, Scenes } from 'telegraf'
import { MyContext } from '../..'
import { User } from '../../mongoDB'

const startScene = new Scenes.BaseScene<MyContext>('Start')

startScene.enter(async (ctx: Context) => {
  const userId = String(ctx.from?.id)
  const user = await User.findById(userId)
  console.log('WWW', user)

  if (user) {
    await ctx.reply(`Hello, ${user.name}`)
  } else {
    const newUser = new User({
      _id: userId,
      username: ctx.from?.username,
      name: `${ctx.from?.first_name} ${ctx.from?.last_name} `,
    })

    await newUser.save()

    await ctx.reply('Welcome')
  }

  console.log(ctx.from)
})

export default startScene
