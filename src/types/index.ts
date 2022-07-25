import { Context, Scenes } from 'telegraf'

export type Author = Record<'name' | 'link', string>

export interface ISearchResult {
  title: string
  src: string
  author: Author
}

export type SearchResults = ISearchResult[]

export interface IBook {
  title: string
  img: string
  description: string
  author: Author
}

export interface ISession extends Scenes.SceneSession {
  searchResalt?: SearchResults
  book?: IBook
}

export interface IMyContext extends Context {
  scene: Scenes.SceneContextScene<IMyContext>
  session: ISession
}
