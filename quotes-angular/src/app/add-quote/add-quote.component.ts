import { Component } from '@angular/core';
import { QuotesService } from '../quotes.service';

const DATE_REGEX = /(\d\d?)\/(\d\d?)\/(\d\d)/;

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent {
  dateError = false;
  buttonDisabled = true;

  constructor(private quoteService: QuotesService) {}

  checkDate(date: string) {
    const matches = DATE_REGEX.exec(date);
    if (matches) {
      const [_, d, m, y] = matches.map((d) => parseInt(d));
      if (d > 31 || d <= 0) {
        this.dateError = true;
        return;
      }
      if (m > 12 || m <= 0) {
        this.dateError = true;
        return;
      }

      if (y < 0) {
        this.dateError = true;
        return;
      }

      this.dateError = false;
      this.buttonDisabled = false;
    } else {
      this.dateError = true;
      this.buttonDisabled = true;

      console.log(this.buttonDisabled);
    }
  }

  async addQuote(quote: string, person: string, date: string) {
    if (this.dateError) {
      return;
    }

    const matches = DATE_REGEX.exec(date.trim());
    console.log(date, matches);
    const [_, d, m, y] = matches!.map((d) => parseInt(d));

    await this.quoteService.addQuote({
      quote,
      person,
      date: new Date(y + 2000, m, d),
    });
  }
}
