class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._tooltipContainer = null
    this.attachShadow({ mode: 'open' })
    const template = document.querySelector('#tooltip-template')
    this.shadowRoot.appendChild(template.content.cloneNode(true))
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
