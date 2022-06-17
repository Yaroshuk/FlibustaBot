import 'dotenv/config'
import Parser from './parser'
import TelegramBot from './telegramBot'

const main = async () => {
  const parser = new Parser()

  parser.search('географ')

  const tmBot = new TelegramBot(process.env.TM_TOKEN!)
  tmBot.launch()
}

main()
