import { prop } from '@typegoose/typegoose'

class Book {
  @prop({ required: true })
  title!: string

  @prop({ required: true })
  author!: string

  @prop({ required: true })
  link!: string
}

export default Book
