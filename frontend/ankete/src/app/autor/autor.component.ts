import { Component, OnInit } from '@angular/core';
import {Test} from '../test.model';
import {Router} from '@angular/router'
import {TestoviService} from '../testovi.service';
import {Odgovor} from '../odgovor.model'
import {OdgovoriService} from '../odgovori.service';
import {Korisnik} from '../korisnik.model'
import {Pitanje} from '../pitanje.model';
import {PitanjaService} from '../pitanja.service'

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  testovi:Array<Test>;
  message: string = "";
  order: string;
  criteria: string;
  about: string = "";
  message2: string = "";
  korisnik: Korisnik;
  dozvoliRad: boolean = false;
  izabrani: Test;
  pretraga: string;


  type:string ="";
  name: string = "";
  startDate: string ="";
  endDate: string = "";
  opis: string ="";
  time: string="";
  points: string="";
  privatnost: string="";
  question: string="";
  qtype: string="";
  numberAnswers: string="";
  obavezan: string="";
  answers: string="";
  correct: string="";
  message3: string="";
  page: string = "";

  qArray: Array<number> = [];

  selectedFile: File;
  uploaded: any;
  message4: string = "";

  anketaPitanja: Array<Pitanje> = null;
  testPitanja: Array<Pitanje> = null;
  anketaPitanje: number;
  testPitanje: number;
  message5: string = "";

  constructor(private router: Router, private serviceT: TestoviService, private serviceO: OdgovoriService, private serviceP: PitanjaService) { }

  ngOnInit() {
    this.getTestove();
    this.korisnik = JSON.parse( localStorage.getItem('korisnik') )

    this.serviceP.getAnketaPitanja().subscribe((pitanja:Array<Pitanje>)=>{
      this.anketaPitanja = pitanja;
    })
    this.serviceP.getTestPitanja().subscribe((pitanja:Array<Pitanje>)=>{
      this.testPitanja = pitanja;
    })
  }

  getTestove(){
    this.serviceT.getTestove().subscribe((testovi:Array<Test>)=>{
      if(testovi.length > 0)
        this.testovi = testovi;
      else 
        this.message = "Nema testova unesenih.";
    })
  }

  orderThem(){
     if(this.order == '+')
     this.testovi = this.testovi.sort((a,b)=>{
     //  return a[this.criteria] > b[this.criteria] ? 1 : a[this.criteria] < b[this.criteria] ? -1 : 0;  
        return a[this.criteria].localeCompare(b[this.criteria]);
     })
     else 
     this.testovi = this.testovi.sort((a,b)=>{
     // return a[this.criteria] > b[this.criteria] ? -1 : a[this.criteria] < b[this.criteria] ? 1 : 0;  
        return b[this.criteria].localeCompare(a[this.criteria]);
    })
  }

  desno(t:Test){
    this.izabrani = t;
    this.about = t.about;
    this.serviceO.checkOdgovor(t.id, this.korisnik.korime).subscribe((odgovor:Odgovor)=>{
        let newDate = new Date(t.endDate);
        let twoDate = new Date(t.startDate);
        let today = new Date();
        if (odgovor && t.type=='test'){
          this.dozvoliRad = false;
          let i: number, max:number = 0;
          for (i=0; i<t.points.length; i++)
            max += t.points[i];
          this.message2 = "Vec ste zavrsili ovaj test ranije, ne mozete opet da ga radite. Vas rezultat na ovom testu je: " + odgovor.points + " poena od ukupno " + max +".";
        }
        else if (newDate < today){
          this.message2 = "Istekao je rok za izradu ovog testa/ankete."
          this.dozvoliRad = false;
        }
        else if (twoDate > today){
          this.message2 = "Test/anketa nije jos uvek otvorena. Sacekajte pocetni datum."
          this.dozvoliRad = false;
        }
        else if (odgovor && t.type=='anketa'){
            if (odgovor.zakljucan == 1){
              this.message2 = "Zakljucali ste anketu. Ne mozete promeniti unete odgovore."
              this.dozvoliRad = false;
            }
            else {
              localStorage.setItem('stanje', JSON.stringify(odgovor) )
              this.message2 = "Mozete slobodno nastaviti sa popunjavanjem ankete tamo gde ste stali."
              this.dozvoliRad = true;
            }
        }
        else if(t.autor == this.korisnik.korime){
          this.dozvoliRad = false;
          this.message2 = "Ne mozete da popunjavate anketu/test koju ste sami napisali. Ccc"
        }
        else {
          this.message2 = "Mozete poceti sa izradom testa/ankete pritiskom na dugme."
          this.dozvoliRad = true;
        }
    })
  }

  pocni(){
    localStorage.setItem('test', JSON.stringify(this.izabrani) )
    this.router.navigate(['/izrada']);
  }

  pretrazi(){
    this.serviceT.getTest(this.pretraga).subscribe((testovi:Array<Test>)=>{
      if (testovi.length > 0)
        this.testovi = testovi;
      else 
        this.message = "Nema testova za slicnim imenom";
    })
  }

  delete(t:Test){
    this.serviceT.deleteTest(t.id).subscribe((rezultat:any)=>{})
    setTimeout(()=>{
      this.getTestove()
    }, 200)    
  }

  addQ(){
    if (this.question==''){
      this.message3 = "Unesite tekst pitanja."
      return
    }
    if (this.qtype==''){
      this.message3 = "Unesite tip pitanja."
      return
    }
    if (this.qtype=='4' || this.qtype =='5'){
        if (this.answers==''){
          this.message3 = "Unesite ponudjene odgovore."
          return
        }
    }
    if (this.type=='anketa'){
        if ((this.qtype=='1' || this.qtype == '2') && this.numberAnswers == ''){
          this.message3 = "Unesite broj ocekivanih odgovora."
          return
        }
        if (this.obavezan==''){
          this.message3 = "Unesite da li je pitanje obavezno."
          return
        }
    }
    else {
        if (this.correct==''){
          this.message3 = "Unesite tacne odgovore."
          return
        }
    }
    this.message3 = "";

    let id:number;
    this.serviceP.getMaxId().subscribe((pitanje:Array<Pitanje>)=>{
      if (pitanje[0])
        id = pitanje[0].id + 1;
      else
        id = 1;

      this.qArray.push(id);
      console.log(this.qArray)

      let answers = this.answers.split(",");
      let correct = this.correct.split(",");
      let obavezan;
      if (this.obavezan != "")
        obavezan = Number(this.obavezan);
      else
        obavezan = this.obavezan;

      this.serviceP.saveQuestion(id, this.question, this.qtype, this.numberAnswers, obavezan, answers, correct)
      .subscribe((rezultat:any)=>{})

      this.question = ""; this.qtype = ""; this.numberAnswers = ""; this.obavezan = ""; this.answers = "", this.correct= ""; 
    })

  }
  addT(){
    if (this.type==''){
      this.message3 = "Unesite tip: anketa ili test."
      return
    }
    if (this.name==''){
      this.message3 = "Unesite ime."
      return
    }
    if (this.startDate==''){
      this.message3 = "Unesite pocetni datum."
      return
    }
    if (this.endDate==''){
      this.message3 = "Unesite krajnji datum."
      return
    }
    if (this.opis==''){
      this.message3 = "Unesite opis."
      return
    }
    if (this.type=='anketa'){
        if (this.privatnost==''){
          this.message3 = "Unesite privatnost ankete: anonimna ili personalizovana."
          return
        }
        if (this.page==''){
          this.message3 = "Unesite paginaciju ankete: koliko pitanja po strani."
          return
        }
    }
    else {
        if (this.time==''){
          this.message3 = "Unesite vreme za izradu, do 3 minuta."
          return
        }
        if (this.points==''){
          this.message3 = "Unesite broj poena za svaki zadatak."
          return
        }
    }
    this.message3 = "";

    let id:number;
    this.serviceT.getMaxId().subscribe((testovi:Array<Test>)=>{
      if (testovi[0])
        id = testovi[0].id + 1;
      else
        id = 1;

      let points = this.points.split(",").map(Number)

      this.serviceT.saveTest(id, this.name, this.startDate, this.endDate, this.opis, this.time, 
        this.korisnik.korime, this.privatnost, this.qArray, this.type, points, this.page).subscribe((rezultat:any)=>{})

      this.name = ""; this.startDate=""; this.endDate=""; this.opis=""; this.time=""; this.privatnost=""; this.qArray= [];
      this.type = ""; this.points = ""; this.page="";
    })
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      this.uploaded = JSON.parse(fileReader.result.toString())
      this.message4 = "Uspesan upload!"
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  upload(){
    if (this.uploaded == null){
      this.message4 = "Izaberite JSON fajl prvo!"
      return
    }

    let name = this.uploaded.Quiz.Name;
    let startDate = this.uploaded.Quiz.StartDate;
    let endDate = this.uploaded.Quiz.EndDate;
    let about = this.uploaded.Quiz.About;
    let type = this.uploaded.Quiz.Type;
    let privatnost = "";
    let page = "";
    let time = "";
    let points = [];
    let qArray = [];
    
    if (type == "anketa"){
      privatnost = this.uploaded.Quiz.Privatnost;
      page = this.uploaded.Quiz.Page;

      let id:number;
      this.serviceP.getMaxId().subscribe((testovi:Array<Test>)=>{
        if (testovi[0])
          id = testovi[0].id + 1;
        else
          id = 1;
        
      let i:number;
      for(i=0; i<this.uploaded.Questions.length; i++){
        let question = this.uploaded.Questions[i].Question;
        let qtype = this.uploaded.Questions[i].Type;
        let obavezan = this.uploaded.Questions[i].Obavezan;
        let numberAnswers; 
        let answers;
        let correct = [];
        if (qtype == '2' || qtype == '1')
          numberAnswers = this.uploaded.Questions[i].NumberAnswers;        
        else  
          numberAnswers = "";
        if (qtype == '4' || qtype == '5')
          answers = this.uploaded.Questions[i].Answers;
        else
          answers = [];
        
        qArray.push(id);

        this.serviceP.saveQuestion(id, question, qtype, numberAnswers, obavezan, answers, correct)
          .subscribe((rezultat:any)=>{})
        
        id++;
      }

      })
    }
    else {
      time = this.uploaded.Quiz.Time;
      points = this.uploaded.Quiz.Points;

      let id:number;
      this.serviceP.getMaxId().subscribe((testovi:Array<Test>)=>{
        if (testovi[0])
          id = testovi[0].id + 1;
        else
          id = 1;
        
      let i:number;
      for(i=0; i<this.uploaded.Questions.length; i++){
        let question = this.uploaded.Questions[i].Question;
        let qtype = this.uploaded.Questions[i].Type;
        let correct = this.uploaded.Questions[i].Correct;
        let numberAnswers = ""; 
        let answers; 
        let obavezan = ""; 
        if (qtype == '4' || qtype == '5')
          answers = this.uploaded.Questions[i].Answers;
        else
          answers = [];
        
        qArray.push(id);

        this.serviceP.saveQuestion(id, question, qtype, numberAnswers, obavezan, answers, correct)
          .subscribe((rezultat:any)=>{})
        
        id++;
      }

      })
    }


    let id:number;
    this.serviceT.getMaxId().subscribe((testovi:Array<Test>)=>{
      if (testovi[0])
        id = testovi[0].id + 1;
      else
        id = 1;


      this.serviceT.saveTest(id, name, startDate, endDate, about, time, 
        this.korisnik.korime, privatnost, qArray, type, points, page).subscribe((rezultat:any)=>{})
    })
  }

  izBazeA(){
    this.qArray.push( this.anketaPitanje*1 )
    this.message5 = "Pitanje ubaceno u anketu!"
    console.log(this.anketaPitanje)
    console.log(this.qArray)
  }

  izBazeT(){
    this.qArray.push( this.testPitanje*1 )
    this.message5 = "Pitanje ubaceno u test!"
    console.log(this.testPitanje)
    console.log(this.qArray)
  }

  pregled(t:Test){
    this.serviceP.getMojaPitanja(t.questions).subscribe((pitanja:Array<Pitanje>)=>{
      
      this.serviceO.getOdgovore(t.id).subscribe((niz:Array<Odgovor>)=>{

        localStorage.setItem('pitanja', JSON.stringify(pitanja))
        localStorage.setItem('test', JSON.stringify(t))
        localStorage.setItem('odgovori', JSON.stringify(niz))
        console.log(pitanja)
        console.log(t)
        console.log(niz)
        this.router.navigate(['/pregled'])
      })
    })
  }
}
