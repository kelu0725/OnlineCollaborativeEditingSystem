import { Component, OnInit } from '@angular/core';
import {Problem} from '../../models/problem.model';
import {DataService} from '../../services/data.service'

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id:0,
  name:'',
  desc:'',
  difficulty:''
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  difficulties:string[]=['easy','medium','hard'];

  newProblem: Problem=Object.assign({},DEFAULT_PROBLEM); //shallow copy from DEFAULT_PROBLEM

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }
  addProblem(){
    this.dataService.addProblem(this.newProblem);
    this.newProblem=Object.assign({}, DEFAULT_PROBLEM);//change to default everytime after adding new one
  }
}
