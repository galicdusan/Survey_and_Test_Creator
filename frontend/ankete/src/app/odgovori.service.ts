import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OdgovoriService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  checkOdgovor(id, korime){
    const data = {
      id: id,
      korime: korime
    }

    return this.http.post(`${this.uri}/checkOdgovor`, data)
  }

  saveOdgovor(id_test, user, points, zakljucan, answers){
    const data = {
      id_test: id_test,
      user: user,
      points: points,
      zakljucan: zakljucan,
      answers: answers
    }

    return this.http.post(`${this.uri}/saveOdgovor`, data)
  }

  getOdgovore(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/getOdgovore`, data)
  }
}
