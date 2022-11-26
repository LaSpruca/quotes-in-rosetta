export const getQuotes = async (): Promise<Quote[]> =>
  (await (await fetch("http://localhost:8000/quotes")).json()).map(
    (quote: Quote) => {
      return { ...quote, date: new Date(quote.date) };
    }
  );

export const deleteQuote = async (index: number) => {
  await fetch("http://localhost:8000/quote/" + index, {
    method: "DELETE",
  });
};

export const addQuote = async (quote: Quote) => {
  await fetch("http://localhost:8000/quote/", {
    method: "POST",
    body: JSON.stringify(quote),
  });
};
