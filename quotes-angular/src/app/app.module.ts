import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuoteViewerComponent } from './quote-viewer/quote-viewer.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';

@NgModule({
  declarations: [AppComponent, QuoteViewerComponent, AddQuoteComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
