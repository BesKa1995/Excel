import { ActiveRoute } from "./ActiveRoute"
import { isValidSelector } from "../utils"
import { $ } from "../dom"

export class Router {
    constructor(selector, routes) {
        isValidSelector(selector)
        this.routes = routes
        this.$placeholder = $(selector)
        this.changePageHandler = this.changePageHandler.bind(this)
        this.page = null
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }

        this.$placeholder.clear()
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard

        this.page = new Page(ActiveRoute.param)
        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}