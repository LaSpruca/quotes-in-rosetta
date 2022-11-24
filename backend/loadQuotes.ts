import type { Quote } from "./index.ts";

const regex = /["“](.+)["”“] *- *([a-zA-Z -]+),? *(\d*)\/(\d*)\/(\d*)\n/g;
const quotes = await Deno.readTextFile("./quotes.txt");
const matches = quotes.matchAll(regex);
if (matches) {
  for (const match of matches) {
    const [_, quote, name, day, month, year] = match;
    const quoteObj: Quote = {
      quote,
      person: name.trim(),
      date: new Date(
        parseInt(year) + (parseInt(year) < 2000 ? 2000 : 0),
        parseInt(month),
        parseInt(day)
      ),
    };

    console.log(
      await (
        await fetch("http://localhost:8000/quote", {
          method: "POST",
          body: JSON.stringify(quoteObj),
        })
      ).text()
    );
  }
}
