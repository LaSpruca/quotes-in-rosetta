import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { deleteQuote } from "./quotes";

@customElement("quote-element")
class QuoteElement extends LitElement {
  @property({ attribute: true })
  index!: number;

  @property({ attribute: true })
  quote: Quote = { date: new Date(), quote: "", person: "" };

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      max-width: 30rem;
      border-radius: 5px;
      background-color: #fff2;
      padding: 2rem 1.5rem;
      gap: 0.5rem;
    }

    button {
      position: absolute;
      left: 50%;
      top: 0.5rem;
      transform: translateX(-50%);
      background: none;
      border: none;
      outline: none !important;
      color: white;
      font-weight: bolder;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      pointer-events: none;
      width: 18px;
      overflow: hidden;
      white-space: nowrap;
    }

    button:hover {
      width: 82px;
    }

    button span {
      font-weight: normal;
    }

    :host(:hover) button {
      opacity: 1;
      pointer-events: all;
    }

    p {
      margin: 0;
      padding: 0;
    }

    .quote-text {
      padding: 0;
      font-weight: bold;
      font-size: 12pt;
    }

    .quote-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3pt;
      font-size: 10pt;
    }

    .quote-name {
      color: #eee;
    }

    .quote-date {
      font-weight: lighter;
      color: #ddd;
    }
  `;

  render() {
    return html` <button @click=${this.deleteSelf}>
        X <span>Remove</span>
      </button>
      <p class="quote-text">${this.quote.quote}</p>
      <div class="quote-details">
        <p class="quote-name">${this.quote.person}</p>
        -
        <p class="quote-date">${this.quote.date.toLocaleDateString()}</p>
      </div>`;
  }

  async deleteSelf() {
    await deleteQuote(this.index);
    this.dispatchEvent(new CustomEvent("quoteChange"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "quote-element": QuoteElement;
  }
}
