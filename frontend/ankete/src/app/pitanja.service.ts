import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PitanjaService {

  uri = 'http://localhost:4000'

  constructor(private http:HttpClient) { }

  getMojaPitanja(questions){
    const data= {
      questions : questions
    }

    return this.http.post(`${this.uri}/getMojaPitanja`, data)
  }

  getMaxId(){
    return this.http.get(`${this.uri}/getMaxId`)
  }

  saveQuestion(id, question, qtype, numberAnswers, obavezan, answers, correct){
    const data= {
      id: id,
      question: question,
      qtype: qtype,
      numberAnswers: numberAnswers,
      obavezan: obavezan,
      answers: answers,
      correct: correct
    }

    return this.http.post(`${this.uri}/saveQuestion`, data)
  }

  getAnketaPitanja(){
    return this.http.get(`${this.uri}/getAnketaPitanja`)
  }

  getTestPitanja(){
    return this.http.get(`${this.uri}/getTestPitanja`)
  }

}
