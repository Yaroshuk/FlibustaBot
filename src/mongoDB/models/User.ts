import { prop, Ref } from '@typegoose/typegoose'
import Book from './Book'

class User {
  @prop({ required: true, unique: true })
  _id!: string

  @prop({ required: true })
  username!: string

  @prop({ required: true })
  name!: string

  @prop({ default: Date.now })
  createdAt!: Date

  @prop({ ref: () => Book })
  books?: Ref<Book>[]
}

export default User
