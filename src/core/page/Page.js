export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error(`Method "getRoot" should be implemented in ${this.constructor.name}`)
    }
    afterRender() {

    }

    destroy() { }
}