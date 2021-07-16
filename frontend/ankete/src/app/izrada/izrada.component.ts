import { Component, OnInit } from '@angular/core';
import { Odgovor } from '../odgovor.model';
import {Pitanje} from '../pitanje.model';
import {OdgovoriService} from '../odgovori.service';
import {PitanjaService} from '../pitanja.service';
import {Router} from '@angular/router';
import {Test} from '../test.model';
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-izrada',
  templateUrl: './izrada.component.html',
  styleUrls: ['./izrada.component.css']
})
export class IzradaComponent implements OnInit {

  questions: Array<Pitanje>;
  numbers: any;
  odgovor: Odgovor;
  ovajTest: Test;
  korisnik: Korisnik;
  dataAvailable = false;
  vreme: string;
  message: string = "";
  message1: string = "";

  currentPage: number = 0;
  perPage: number;
  pages: Array<number> = [];

  constructor(private router:Router, private serviceO: OdgovoriService, private serviceP: PitanjaService) { }

  ngOnInit() {
    this.initialize();
    if(this.ovajTest.type=='test'){
      this.message1 = "Preostalo vreme za resavanje: ";
      this.tajmer();
    }    
  }

  initialize(){

    this.ovajTest = JSON.parse( localStorage.getItem('test') )
    this.odgovor = JSON.parse( localStorage.getItem('stanje') )
    this.korisnik = JSON.parse( localStorage.getItem('korisnik') )
    this.numbers = [];
    this.vreme = this.ovajTest.time;

    this.serviceP.getMojaPitanja(this.ovajTest.questions).subscribe((questions: Array<Pitanje>)=>{
        this.questions = questions;

//  
      if (this.ovajTest.type == 'test'){
        let it:number;
        let ir:number;
        let num1:number;
        let num2:number;
        for(it=0; it<10; it++){
          num1 = Math.floor(Math.random()*this.questions.length);
          num2 = Math.floor(Math.random()*this.questions.length);
          [this.questions[num1], this.questions[num2]] = [this.questions[num2], this.questions[num1]];
        }
        for(it=0; it<this.questions.length; it++){
          if(this.questions[it].type == '4' || this.questions[it].type == '5'){
            for(ir=0; ir<10; ir++){
              num1 = Math.floor(Math.random()*this.questions[it].answers.length);
              num2 = Math.floor(Math.random()*this.questions[it].answers.length);
              [this.questions[it].answers[num1], this.questions[it].answers[num2]] = [this.questions[it].answers[num2], this.questions[it].answers[num1]];
            }
          }
        }
      }
      
      if(this.ovajTest.type=='anketa'){
        if (Number(this.ovajTest.page) > this.questions.length)
          this.ovajTest.page = String(this.questions.length)
        this.perPage = Math.ceil(this.questions.length/ Number(this.ovajTest.page))
        let iter:number;
        for(iter=0; iter<Number(this.ovajTest.page);iter++)
          this.pages.push(iter);
      }
//    

      let zapamcen:Array<Pitanje> = JSON.parse( localStorage.getItem('pitanja') );
      if (zapamcen != null )
        this.questions = zapamcen;



      if (this.odgovor == null){
        this.odgovor = {
          'id_test': this.ovajTest.id, 'user': this.korisnik.korime, 'points': 0, 'zakljucan': 0, 'answers': [] 
        }

        let i:number;
        for (i=0; i<this.questions.length; i++){
          this.odgovor.answers.push( {'id_question': this.questions[i].id, 'answer': [""]} )
          this.numbers.push([1]);

          let j:number;
          if(this.questions[i].type == '1' || this.questions[i].type == '2'){
            for (j=1; j< Number(this.questions[i].numberAnswers); j++){
              this.odgovor.answers[i].answer.push(""); 
              this.numbers[i][j] = j+1;        
            }
          }

          if(this.questions[i].type == '5'){
            for (j=0; j< this.questions[i].answers.length-1; j++)
              this.odgovor.answers[i].answer.push("");
          }
        }     
      }
      else {
        if (this.ovajTest.type=='test')
          this.vreme = localStorage.getItem('vreme') 
          
        let i: number;
        for (i=0; i<this.questions.length; i++){
          this.numbers.push([1]); 
          let j:number;
          if(this.questions[i].type == '1' || this.questions[i].type == '2'){
            for (j=1; j< Number(this.questions[i].numberAnswers); j++)
              this.numbers[i][j] = j+1;                   
          }
        }        
      }
      localStorage.setItem('pitanja', JSON.stringify(this.questions))
      this.dataAvailable = true;
      console.log(this.questions);  
      console.log(this.odgovor);
      console.log(this.numbers);


    })


  }

  insert(a, k, i){
    let element = <HTMLInputElement>document.getElementById(a);
    if (element.checked)
      this.odgovor.answers[k].answer[i] = a;
    else 
      this.odgovor.answers[k].answer[i] = "";
  }

  predaj(){
      let obavezni = this.obavezna();
      if (obavezni != ""){
        this.message = "Niste uneli sva obavezna pitanja, obavezna pitanja su: " + obavezni;
        return
      }

      localStorage.setItem('stanje', JSON.stringify(this.odgovor) )
      localStorage.setItem('vreme', this.vreme)
      this.router.navigate(['/rezultat'])
  }

  pomoc(){
    localStorage.clear();
  }

  tajmer(){
    let time: number;
    
    let intervalId = setInterval(()=>{
      time = Number(this.vreme.charAt(0)) * 60 + Number(this.vreme.charAt(2)) * 10 + Number(this.vreme.charAt(3));
      time --;
      this.vreme = String(Math.floor(time/60)) + ":";
      if (time%60 >= 10)
        this.vreme += String(time%60);
      else
        this.vreme += "0" + String(time%60);
      
      if (time == 10) 
        this.message = "Paznja! Test se uskoro zatvara."
      if (time == 0){ 
        clearInterval(intervalId);        
        localStorage.setItem('stanje', JSON.stringify(this.odgovor) )
        localStorage.setItem('vreme', '0:01')
        this.router.navigate(['/rezultat'])
      }
    }, 1000)

  }

  obavezna():string{
    let msg = "";
    let i: number;
    let j: number;
    if (this.ovajTest.type == 'anketa'){
      for(i=0; i<this.questions.length; i++){
        if(this.questions[i].obavezan == 1){
          let a = false;
          for(j=0; j<this.odgovor.answers[i].answer.length; j++)
            if(this.odgovor.answers[i].answer[j] != ""){
              a = true;
              break;
            }
          if(!a)
            msg += (i+1) + " ";
        }
      }
    }
    else {
      for(i=0; i<this.questions.length; i++){
          let a = false;
          for(j=0; j<this.odgovor.answers[i].answer.length; j++)
            if(this.odgovor.answers[i].answer[j] != ""){
              a = true;
              break;
            }
          if(!a)
            msg += (i+1) + " ";
      }
    }
    return msg
  }

  move(p){
    this.currentPage = p;
  }
}
