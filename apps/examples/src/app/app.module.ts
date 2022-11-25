import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickAsyncDirective } from 'click-async';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ClickAsyncDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
