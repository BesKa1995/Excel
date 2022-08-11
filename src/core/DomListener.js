import { capitalize } from "./utils"

export default class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      console.log(this)
      this[method] = this[method].bind(this)
      console.log(this[method] === this[method].bind(this))
      if (!this[method]) {
        throw new Error(`Method '${method}' does not exist in ${this.name} Component`)
      }
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
