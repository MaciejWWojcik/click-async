import { Component } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'click-async-root',
  template: '<button [clickAsync]="runSomethingAsync">Click me</button>',
})
export class AppComponent {
  runSomethingAsync(): Observable<string> {
    return of('👀').pipe(tap(console.log));
  }
}
