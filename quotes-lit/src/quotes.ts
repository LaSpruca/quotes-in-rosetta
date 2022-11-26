export const getQuotes = async (): Promise<Quote[]> =>
  (await (await fetch("http://localhost:8000/quotes")).json()).map(
    (quote: Quote) => {
      return { ...quote, date: new Date(quote.date) };
    }
  );
