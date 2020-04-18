class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._tooltipContainer = null
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
        ::slotted(.highlight) {
          background-color: palevioletred;
        }
      </style>
      <slot></slot>
      <span> (?)</span>
    `
  }

  connectedCallback() {
    this._tooltipText = this.getAttribute('text')
    const tooltipIcon = this.shadowRoot.querySelector('span')
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.shadowRoot.appendChild(tooltipIcon)
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
