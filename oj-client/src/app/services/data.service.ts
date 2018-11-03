import { Injectable } from '@angular/core';
import {Problem} from '../models/problem.model';
import {PROBLEMS} from'../fake-problem';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getProblems(): Problem[]{
    return PROBLEMS;
  }

  getProblem(id:number):Problem{
    return PROBLEMS.find((problem) => problem.id === id);
    //lambda function. function(problem){problem.id===id}
  }
  //add problem
}
