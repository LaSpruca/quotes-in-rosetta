import { Component } from '@angular/core';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  quotes: Quote[] = [];

  constructor(private quotesService: QuotesService) {
    quotesService.updateListener(async () => {
      this.quotes = await quotesService.getQuotes();
    });
  }

  async ngOnInit() {
    this.quotes = await this.quotesService.getQuotes();
  }
}
