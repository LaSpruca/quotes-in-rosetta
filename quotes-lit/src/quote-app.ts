import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { getQuotes } from "./quotes";
import Fuse from "fuse.js";

import "./quote-element";
import "./add-quote";

@customElement("quote-app")
class App extends LitElement {
  @query("#search", true)
  protected input!: HTMLInputElement;

  @state({})
  protected quotesFiltered: Quote[] = [];

  @state({})
  protected quotes: Quote[] = [];

  quotesFuse!: Fuse<Quote>;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .quotes {
      display: flex;
      flex-wrap: wrap;
      padding: 5rem 2rem;
      gap: 2rem;
      justify-content: center;
      align-items: center;
    }

    .search-wrapper {
      display: flex;
      font-weight: bold;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }

    #search {
      background-color: #fff3;
      border: none;
      padding: 0.6rem 0.5rem;
      color: white;
      font-size: 10pt;
      border-radius: 5px;
    }

    #search:focus {
      outline: none;
    }
  `;

  render() {
    let quoteElements = this.quotesFiltered.map(
      (quote, index) =>
        html`<quote-element
          .quote=${quote}
          index=${quote.index ?? index}
          @quoteChange=${this.reloadQuotes}
        ></quote-element>`
    );
    return html`
      <h1>Le Quote</h1>
      <label for="search" class="search-wrapper">
        Search <input @keyup=${this._queryValueUpdated} id="search" />
      </label>
      <add-quote @reloadQuotes=${this.reloadQuotes}></add-quote>
      <div class="quotes">${quoteElements}</div>
    `;
  }

  _queryValueUpdated() {
    const text = this.input.value;
    if (text == "") {
      this.quotesFiltered = this.quotes;
    } else {
      const filtered = this.quotesFuse.search(text);
      this.quotesFiltered = filtered.map((fuseRes) => {
        return { ...fuseRes.item, index: fuseRes.refIndex };
      });
    }
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.reloadQuotes();
  }

  async reloadQuotes() {
    this.quotes = await getQuotes();
    this.quotesFiltered = this.quotes;
    this.quotesFuse = new Fuse(this.quotes, {
      keys: ["person", "quote"],
      threshold: 0.3,
    });
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    console.log("name", name, "old", _old, "new", value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "quote-app": App;
  }
}
