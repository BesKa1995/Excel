import DomListener from "./DomListener"

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
        this.store = options.store
        this.subscribe = options.subscribe || []
    }

    prepare() { }

    toHTML() {
        return 'test'
    }

    $emit(event, ...args) {
        this.emitter.emit([event], ...args)
    }

    $dispatch(actions) {
        this.store.dispatch(actions)
    }

    storeChanged() { }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    $on(event, ...args) {
        const unsub = this.emitter.subscribe(event, ...args)
        this.unsubscribers.push(unsub)
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}


