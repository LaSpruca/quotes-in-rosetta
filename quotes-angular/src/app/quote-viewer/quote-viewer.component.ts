import { Component, Input } from '@angular/core';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quote-viewer',
  templateUrl: './quote-viewer.component.html',
  styleUrls: ['./quote-viewer.component.scss'],
})
export class QuoteViewerComponent {
  @Input() quote!: Quote;
  @Input() index!: number;

  constructor(private quotesService: QuotesService) {}

  async deleteSelf() {
    console.log('yeet');
    const response = await this.quotesService.deleteQuote(this.index);
    console.log(response);
  }
}
