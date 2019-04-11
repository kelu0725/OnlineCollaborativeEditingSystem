import { Component, OnInit } from '@angular/core';
import {Problem} from '../../models/problem.model';
import {DataService} from '../../services/data.service'

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id:0,
  name:'',
  desc:'',
  difficulty:'easy'
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})

export class NewProblemComponent implements OnInit {

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM); //shallow copy from DEFAULT_PROBLEM
  difficulties:string[] = ['easy','medium','hard'];
  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  addProblem(){
    this.dataService.addProblem(this.newProblem);//此处加的是一个problem的reference
    //homework: error handle
    this.newProblem=Object.assign({}, DEFAULT_PROBLEM);
    //change to default everytime after adding new one
  }
}
