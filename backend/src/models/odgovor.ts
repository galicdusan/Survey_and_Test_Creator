import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Odgovor = new Schema({
    id_test: Number,
    user: String,
    points: Number,
    zakljucan: Number,
    answers: [{
        id_question: Number,
        answer: [String]
    }]
});

export default mongoose.model('Odgovor', Odgovor, 'odgovori');