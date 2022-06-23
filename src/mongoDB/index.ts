import mongoose from 'mongoose'

export { User, Book } from './models'

console.log(process.env.DB_URL!)

mongoose.connect(process.env.DB_URL!).catch((error) => {
  console.log('Mongo Error', error)
})
