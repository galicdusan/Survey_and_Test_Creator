import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    ime: String,
    prezime: String,
    korime: String,
    lozinka: String,
    datum_rodjenja:String,
    mesto_rodjenja:String,
    jmbg: String,
    telefon: String,
    mail: String,
    tip: String,
    zahtev: String
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');