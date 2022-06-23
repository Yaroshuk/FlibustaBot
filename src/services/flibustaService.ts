import axios from 'axios'
import { parseBookPage, parseSearchResult } from '../utils/parser'

class FlibustaService {
  static instance: FlibustaService

  private url: string = process.env.URL ?? ''
  private searchUrl: string = process.env.SEARCH_URL ?? ''

  constructor() {
    if (FlibustaService.instance) {
      return FlibustaService.instance
    }

    FlibustaService.instance = this
  }

  public async getSearchResult(search: string): Promise<any[]> {
    try {
      const response = await axios(this.searchUrl, {
        params: {
          ask: search.trim(),
        },
      })

      if (response.status === 200) {
        const result = await parseSearchResult(response.data)
        return result
      }

      return []
    } catch (error) {
      throw new Error(`Flibusta Error: ${error}`)
    }
  }

  public async getBook(url: string) {
    try {
      const response = await axios(`${this.url}${url}`)

      if (response.status === 200) {
        const book = await parseBookPage(response.data)
        console.log(book)
      }
    } catch (error) {
      throw new Error(`Flibusta Error: ${error}`)
    }
  }
}

export default FlibustaService
