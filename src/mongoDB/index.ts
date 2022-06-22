import mongoose from 'mongoose'

export { User, Book } from './models'

console.log(process.env.DB_URL!)

const connection = mongoose.createConnection(process.env.DB_URL!)

export default connection
