import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    //this is an observable
  //   let observerStream$ = new Observable(observer => {
  //     console.log('observable execution');
  //     observer.next(1);
  //     observer.next(2);
  //     setTimeout(()=>{
  //       observer.next("balalablala");
  //     }, 3000);
  //     // observer.error(new Error('no more movies'));
  //     observer.next(3);
  //     observer.complete();
  //   });
  //
  // let observer1 =  observerStream$.subscribe(
  //     value => console.log(value),
  //     error => console.error(error),
  //     () => console.log(`done`));
  //
  //     setTimeout(() => {
  //       observer1.unsubscribe();
  //     }, 2000);

 //  let subject = new Subject();
 //  subject.subscribe((v) => {
 //    console.log('Observer A:'+ v);
 //  })
 //
 // subject.next(1)
 //
 // subject.subscribe((v) => {
 //   console.log('Observer B' + v);
 // })

  // const numbers = [1,2,3,4,5]
  // const numbers$ = Observable.from(numbers);
  // let observer1 =  numbers$.subscribe(
  //     value => console.log(value),
  //     error => console.error(error),
  //     () => console.log(`done`));

  const btn = document.querySelector('#btn');
  const btn$ = Observable.fromEvent(btn, 'click');

  let sub = btn$.subscribe(
        value => console.log(value.target.innerHTML),
        error => console.error(error),
        () => console.log(`done`));
  
   }


}
