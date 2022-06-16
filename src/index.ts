import 'dotenv/config'
import cheerio from 'cheerio'
import axios from 'axios'
import Parser from './parser'

const main = async () => {
  const parser = new Parser()

  parser.search('географ')
}

main()