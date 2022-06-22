import { getModelForClass } from '@typegoose/typegoose'
import BookSchema from './Book'
import UserSchema from './User'

export const Book = getModelForClass(BookSchema)
export const User = getModelForClass(UserSchema, { schemaOptions: { _id: false } })
