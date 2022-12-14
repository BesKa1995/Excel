import { isValidSelector } from "../utils"
import { $ } from "../dom"
import { ActiveRoute } from "./ActiveRoute"
import { Loader } from "../../components/Loader"

export class Router {
    constructor(selector, routes) {
        isValidSelector(selector)
        this.routes = routes
        this.$placeholder = $(selector)
        this.changePageHandler = this.changePageHandler.bind(this)
        this.page = null
        this.loader = new Loader()
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    async changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }

        this.$placeholder.clear().append(this.loader)
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel
            : this.routes.dashboard

        this.page = new Page(ActiveRoute.param)
        const root = await this.page.getRoot()
        this.$placeholder.clear().append(root)
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}