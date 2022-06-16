import 'dotenv/config'
import Parser from './parser'

const main = async () => {
  const parser = new Parser()

  parser.search('географ')
}

main()
