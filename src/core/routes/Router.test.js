import { Page } from "../page/Page"
import { Router } from "./Router"
class DashBoard extends Page {
    getRoot() {
        const root = document.createElement('div')
        root.innerHTML = 'dashboard'
        return root
    }
}

class ExcelPage extends Page {
    getRoot() {

    }
}

describe('Router:', () => {
    let $root
    let router
    beforeEach(() => {
        $root = document.createElement('div')
        router = new Router($root, {
            dashboard: DashBoard,
            excel: ExcelPage
        })
    })

    test('should be defined', () => {
        expect(router).toBeDefined()
    })
})
