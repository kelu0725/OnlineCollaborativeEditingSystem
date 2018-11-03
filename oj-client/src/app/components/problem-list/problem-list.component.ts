import { Component, OnInit } from '@angular/core';
import {Problem} from '../../models/problem.model';
import {DataService} from '../../services/data.service'

@Component({ //declare this is a component
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit { //view can only access the value in model, but not the const value outside
  problems: Problem[];
  constructor(private dataService:DataService) {

   }

  ngOnInit() {
    this.getProblems();
  }

  getProblems():void { //typescript
    this.problems = this.dataService.getProblems();
  }

}
