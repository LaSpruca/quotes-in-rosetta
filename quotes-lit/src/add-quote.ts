import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { addQuote } from "./quotes";

@customElement("add-quote")
class AddQuote extends LitElement {
  @property({ attribute: false })
  opened = true;

  @query("#quote")
  quote!: HTMLInputElement;
  @query("#name")
  person!: HTMLInputElement;
  @query("#date")
  date!: HTMLInputElement;

  static styles = css`
    :host {
      align-self: flex-start;
      justify-self: flex-start;
      margin-top: 1rem;
      position: relative;
      background-color: #fff2;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: width 0.1s ease-in-out;
      width: 107.23px;
      overflow: hidden;
    }

    :host(.opened) {
      width: 100%;
    }
    .wrapper.opened {
      width: 100%;
    }

    .expand {
      background: none;
      outline: none !important;
      border: none;
      padding: 1rem;
      color: white;
      align-self: flex-start;
      justify-self: flex-start;
    }

    .form {
      flex-direction: column;
      display: none;
      align-self: center;
      justify-self: center;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      padding-bottom: 0.3rem;
    }

    input {
      background-color: #fff3;
      border: none;
      border-radius: 5px;
      padding: 10px 5px;
      outline: none !important;
      color: white;
    }

    :host(.opened) .form {
      display: flex;
    }
  `;

  render() {
    if (this.opened) {
      this.classList.add("opened");
    } else {
      this.classList.remove("opened");
    }
    return html`
      <button @click=${() => (this.opened = !this.opened)} class="expand">
        Add Quote <span>&gt;</span>
      </button>
      <div class="form">
        <label for="quote">Quote <input id="quote" /></label>
        <label for="name">By <input id="name" /></label>
        <label for="date"
          >On
          <input
            id="date"
            type="date"
            value=${new Date().toISOString().substring(0, 10)}
        /></label>
        <button @click=${this.submit}>Submit</button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  async submit() {
    await addQuote({
      date: this.date.valueAsDate!,
      person: this.person.value,
      quote: this.quote.value,
    });

    this.date.value = new Date().toISOString().substring(0, 10);
    this.person.value = "";
    this.quote.value = "";

    this.dispatchEvent(new CustomEvent("reloadQuotes"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "add-quote": AddQuote;
  }
}
