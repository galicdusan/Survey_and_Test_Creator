import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { startSession } from 'mongoose';

 
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

var fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/ankete');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

app.post('/api/upload', multipartMiddleware, (req, res) => {
    
 //@ts-ignore
    fs.rename(req.files.upload.path, 'uploads//'+req.files.upload.name, (err)=> { if(err) console.log(err) })
    
    res.json({
        'message': 'File uploaded successfully'
    });
});

import Korisnik from './models/korisnik';

router.route('/saveKorisnik').post(
    (req,res)=> {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let korime = req.body.korime;
        let lozinka = req.body.lozinka;
        let datum = req.body.datum;
        let mesto = req.body.mesto;
        let jmbg = req.body.jmbg;
        let telefon = req.body.telefon;
        let email = req.body.email;

        let k = new Korisnik({ 'ime':ime, 'prezime':prezime, 'korime':korime, 'lozinka':lozinka, 'datum_rodjenja':datum, 
        'mesto_rodjenja': mesto, 'jmbg':jmbg, 'telefon':telefon, 'mail':email, 'tip':'ispitanik', 'zahtev': 'cekanje' })
        k.save((err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik);
        })
    }
)

router.route('/getKorisnik').post(
    (req,res)=> {
        let korime = req.body.korime;

        Korisnik.findOne({'korime':korime}, 
        (err, korisnik)=> {
            if (err) console.log(err)
            else res.json(korisnik)
        })
    }
)

router.route('/getEmailUsers').post(
    (req,res)=> {
        let mail = req.body.email;

        Korisnik.find({'mail':mail},
        (err, korisnici)=> {
            if (err) console.log(err)
            else res.json(korisnici)
        })
    }
)

router.route('/updateLozinka').post(
    (req,res)=> {
        let lozinka = req.body.lozinka;
        let korime = req.body.korime;

        Korisnik.collection.update(
            {'korime':korime},
            {
                $set: { 'lozinka':lozinka }
            },
            (err, korisnik)=>{
                if (err) console.log(err)
                else res.json(korisnik)
            }
        )
    }
)

import Test from './models/test';
import Pitanje from './models/pitanje';
import Odgovor from './models/odgovor';

router.route('/getTestove').get(
    (req,res)=>{
        Test.find({},
        (err, testovi)=>{
            if(err)console.log(err)
            else res.json(testovi)
        })
    }
)

router.route('/checkOdgovor').post(
    (req,res)=>{
        let id = req.body.id;
        let korime = req.body.korime;

        Odgovor.findOne({'id_test':id, 'user':korime},
        (err, odgovor)=> {
            if(err)console.log(err)
            else res.json(odgovor)
        })
    }
)

router.route('/getTest').post(
    (req,res)=>{
        let pretraga = req.body.pretraga;

        Test.find(
        {'name': new RegExp(pretraga, "i")},
        (err, testovi)=>{
            if(err)console.log(err)
            else res.json(testovi)
        })
    }
)

router.route('/getMojaPitanja').post(
    (req,res)=>{
        let questions = req.body.questions;

        Pitanje.find(
        {
            'id': { $in: questions }
        },
        (err,q)=>{
            if(err)console.log(err)
            else res.json(q)
        })
    }
)

router.route('/saveOdgovor').post(
    (req,res)=>{
        let odgovor = new Odgovor({'id_test': req.body.id_test, 'user':req.body.user, 'points':req.body.points, 'zakljucan':req.body.zakljucan, 'answers':req.body.answers})

        Odgovor.deleteOne(
        {
             'id_test': req.body.id_test, 'user': req.body.user
        },
        (err)=>{
            if (err)console.log(err)
            else console.log('Uspesno brisanje')
        })

        odgovor.save((err, o)=>{
            if (err)console.log(err)
            else res.json(o)
        })
    }
)

router.route('/deleteTest').post(
    (req,res)=>{
        let id = req.body.id

        Test.deleteOne({'id':id},
        (err)=>{
            if(err)console.log(err)
            else console.log('Uspesno brisanje')
        })
    }
)

router.route('/getMaxId').get(
    (req,res)=>{
        Pitanje.find({},
            (err,q)=>{
                if(err)console.log(err)
                else res.json(q)
            }
            ).sort({'id':-1}).limit(1)

    }
)

router.route('/saveQuestion').post(
    (req,res)=>{
        let id = req.body.id;
        let question = req.body.question;
        let qtype = req.body.qtype;
        let numberAnswers = req.body.numberAnswers;
        let obavezan = req.body.obavezan;
        let answers = req.body.answers;
        let correct = req.body.correct;

        let q = new Pitanje({'id':id, 'question':question, 'type':qtype, 'numberAnswers':numberAnswers,
         'obavezan':obavezan, 'answers':answers, 'correct':correct})

        q.save((err, q1)=>{
            if(err)console.log(err)
            else res.json(q1)
        })
    }
)

router.route('/getMaxIdT').get(
    (req,res)=>{
        Test.find({},
            (err, t)=>{
                if(err)console.log(err)
                else res.json(t)
            }
            ).sort({'id':-1}).limit(1)
    }
)

router.route('/saveTest').post(
    (req,res)=>{
        let id = req.body.id;
        let name = req.body.name;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let opis = req.body.opis;
        let time = req.body.time;
        let korime = req.body.korime;
        let privatnost = req.body.privatnost;
        let qArray = req.body.qArray;
        let type = req.body.type;
        let points = req.body.points;
        let page = req.body.page;

        let t = new Test({'id':id, 'name':name, 'startDate':startDate, 'endDate':endDate, 'about':opis, 'time':time, 
        'autor':korime, 'privatnost': privatnost, 'questions':qArray, 'type':type, 'points':points, 'page':page})

        t.save((err, t1)=>{
            if(err)console.log(err)
            else res.json(t1)
        })
    }
)

router.route('/getAnketaPitanja').get(
    (req,res)=>{
        Pitanje.find(
        {
            'obavezan': { $ne: null }
        },
        (err, pitanja)=>{
            if(err)console.log(err)
            else res.json(pitanja)
        })
    }
)

router.route('/getTestPitanja').get(
    (req,res)=>{
        Pitanje.find(
        {
            'obavezan': null
        },
        (err, pitanja)=>{
            if(err)console.log(err)
            else res.json(pitanja)
        })
    }
)

router.route('/getOdgovore').post(
    (req,res)=>{
        let id = req.body.id;

        Odgovor.find({'id_test':id},
        (err, odgovori)=>{
            if(err)console.log(err)
            else res.json(odgovori)
        })
    }
)

router.route('/getMojiKorisnici').post(
    (req,res)=>{
        let usernames = req.body.usernames;

        Korisnik.find(
        {
            'korime': { $in: usernames }
        },
        (err, korisnici)=>{
            if(err)console.log(err)
            else res.json(korisnici)
        })
    }
)

router.route('/getKorisnici').post(
    (req,res)=>{
        let zahtev = req.body.zahtev;

        Korisnik.find(
        {
            'zahtev': zahtev
        },
        (err, korisnici)=>{
            if(err)console.log(err)
            else res.json(korisnici)
        })
    }
)

router.route('/updatePolje').post(
    (req,res)=>{
        let korime = req.body.korime;
        let polje = req.body.polje;
        let vrednost = req.body.vrednost;

        Korisnik.collection.update(
            {'korime':korime},
            {
                $set: { [polje] :vrednost }
            },
            (err, korisnik)=>{
                if (err) console.log(err)
                else res.json(korisnik)
            }
        )
    }
)

router.route('/deleteKorisnik').post(
    (req,res)=>{
        let korime = req.body.korime;

        Korisnik.deleteOne({'korime':korime},
        (err)=>{
            if(err)console.log(err)
            else console.log('Uspesno brisanje')
        })
    }
)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
