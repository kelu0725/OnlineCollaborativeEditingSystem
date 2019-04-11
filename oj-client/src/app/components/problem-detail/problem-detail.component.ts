import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Problem} from '../../models/problem.model';
// import {NewProblemComponent} from '../'

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})


export class ProblemDetailComponent implements OnInit {
  problem: Problem; //declaration

  constructor(private dataService:DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params)=> {//这里的params指的是routing里的param
      // this.problem = this.dataService.getProblem(+params['id']);
      //+ is to convert string to number

      this.dataService.getProblem(+params['id'])
      .then(problem => this.problem = problem);
    })
  };

}
