class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._tooltipContainer = null
    this._tooltipIcon = null
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 50px;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }
        ::slotted(.highlight) {
          background-color: palevioletred;
        }
        .icon {
          background-color: black;
          color: white;
          border-radius: 50%;
          padding: 0.15rem 0.5rem;
        }
        :host {
          background-color: white;
        }
        :host(.important) {
          color: var(--color-primary, red);
          padding: 0.15rem;
        }
        :host-context(p) {
          font-weight: bold;
        }
      </style>
      <slot>Default value</slot>
      <span class="icon">?</span>
    `
  }

  connectedCallback() {
    this._tooltipText = this.getAttribute('text')
    this._tooltipIcon = this.shadowRoot.querySelector('span')
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.shadowRoot.appendChild(this._tooltipIcon)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    if (name === 'text') {
      this._tooltipText = newValue
    }
  }

  static get observedAttributes() {
    return ['text']
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText
    this.shadowRoot.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }
}

customElements.define('my-tooltip', Tooltip)
