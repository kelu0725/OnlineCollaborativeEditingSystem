import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    //this is an observable
    let observerStream$ = new Observable(observer => {
      console.log('observable execution');
      observer.next(1);
      observer.next(2);
      setTimeout(()=>{
        observer.next("balalablala");
      }, 3000);
      // observer.error(new Error('no more movies'));
      observer.next(3);
    });

  let observer1 =  observerStream$.subscribe(
      value => console.log(value),
      error => console.error(error),
      () => console.log(`done`));

      setTimeout(() => {
        observer1.unsubscribe();
      }, 2000);

  }

}
