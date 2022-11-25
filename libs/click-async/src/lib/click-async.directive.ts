import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';

@Directive({
  selector: '[clickAsync]',
  standalone: true,
})
export class ClickAsyncDirective<T> implements OnDestroy {
  @Input() clickAsync!: () => Observable<T>;

  private readonly onDestroy = new ReplaySubject(1);

  @HostListener('click')
  onClick() {
    this.clickAsync().pipe(takeUntil(this.onDestroy)).subscribe();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
