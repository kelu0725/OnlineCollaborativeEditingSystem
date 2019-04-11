import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Observable:数据流: values, complete, error;
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'; //
import 'rxjs/add/operator/toPromise';

import {Problem} from '../models/problem.model';
// import {PROBLEMS} from'../fake-problem';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient){}

  getProblems(): Observable<Problem[]>{
    // return this.problems;
    this.httpClient.get('api/v1/problems')
    .toPromise()
    .then((res: any) => {
      this._problemSource.next(res);
    })
    .catch(this.handleError);
    return this._problemSource.asObservable();
  }

 // get particular problem
  getProblem(id:number):Promise<Problem>{
    // return this.problems.find((problem) => problem.id === id);
    //lambda function. function(problem){problem.id===id}
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res : any) => res)
      .catch(this.handleError);
  }

//add particular problem
  addProblem(problem:Problem){
    // problem.id = this.problems.length + 1;
    const options = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
    return this.httpClient.post('api/v1/problems', problem, options)
    .toPromise()
    .then((res : any) => { //为了让前端更新
      this.getProblems();
      return res;
    })
    .catch(this.handleError);

  }

  //
  private handleError(error: any): Promise<any>{
    return Promise.reject(error.body || error);
  }
}
