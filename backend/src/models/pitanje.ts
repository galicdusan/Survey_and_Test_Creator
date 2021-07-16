import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Pitanje = new Schema({
    id: Number,
    question: String,
    type: String,
    numberAnswers: String,
    obavezan: Number,
    answers : [String],
    correct : [String]
});

export default mongoose.model('Pitanje', Pitanje, 'pitanja');