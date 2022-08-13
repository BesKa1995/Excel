class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append({ $el }) {
    this.$el.appendChild($el)
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset
  }
  findAll(selector) {
    return [...this.$el.querySelectorAll(selector)].map(el => {
      return $(el)
    })
  }
  css(styles = {}) {
    Object
      .keys(styles)
      .forEach(key => {
        this.$el.style[key] = styles[key]
      })
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}