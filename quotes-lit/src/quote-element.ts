import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("quote-element")
class QuoteElement extends LitElement {
  @property({ attribute: true })
  quote: Quote = { date: new Date(), quote: "", person: "" };

  static styles = css`
    :host {
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
    return html`<p class="quote-text">${this.quote.quote}</p>
      <div class="quote-details">
        <p class="quote-name">${this.quote.person}</p>
        -
        <p class="quote-date">${this.quote.date.toLocaleDateString()}</p>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "quote-element": QuoteElement;
  }
}
