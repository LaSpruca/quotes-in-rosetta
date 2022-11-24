import { Injectable } from '@angular/core';

type Callback = (quotes: Quote[]) => Promise<void> | void;

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  #callbacks: Map<number, Callback> = new Map();
  #id = 0;

  constructor() {}

  async deleteQuote(id: number) {
    const response = await fetch(`http://localhost:8000/quote/${id}`, {
      method: 'DELETE',
    });

    const newQuotes = await this.getQuotes();
    [...this.#callbacks.entries()].forEach(([_, callback]) =>
      callback(newQuotes)
    );

    return response;
  }

  async getQuotes(): Promise<Quote[]> {
    return (await (await fetch('http://localhost:8000/quotes')).json()).map(
      (quote: Quote) => {
        return {
          ...quote,
          date: new Date(quote.date),
        };
      }
    );
  }

  updateListener(callback: Callback) {
    this.#callbacks.set(this.#id, callback);
    const id = this.#id;
    this.#id++;

    return () => {
      this.#callbacks.delete(id);
    };
  }

  async addQuote(quote: Quote) {
    const response = await fetch(`http://localhost:8000/quote`, {
      method: 'POST',
      body: JSON.stringify(quote),
    });

    const newQuotes = await this.getQuotes();
    [...this.#callbacks.entries()].forEach(([_, callback]) =>
      callback(newQuotes)
    );

    return response;
  }
}
