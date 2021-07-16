import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Test = new Schema({
    id: Number,
    name: String,
    startDate: String,
    endDate: String,
    about: String,
    time: String,
    autor: String,
    privatnost: String,
    page: String,
    questions: [Number],
    type: String,
    points: [Number]
})

export default mongoose.model('Test', Test, 'testovi')