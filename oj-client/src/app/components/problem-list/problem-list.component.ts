import { Component, OnInit, OnDestroy } from '@angular/core';
import {Problem} from '../../models/problem.model';
import {DataService} from '../../services/data.service'

import {Subscription} from 'rxjs/Subscription';


@Component({ //declare this is a component
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit, OnDestroy {
  //view can only access the value in model, but not the const value outside
  problems: Problem[];
  subscriptionProblems: Subscription;
  constructor(private dataService:DataService) {

   }

  ngOnInit() {
    this.getProblems();
  }

  ngOnDestroy(){
    this.subscriptionProblems.unsubscribe();
  }

  getProblems():void {
    // this.problems = this.dataService.getProblems()
    this.subscriptionProblems = this.dataService.getProblems()
    .subscribe(problems => this.problems = problems);
  }
}
