import { Excel } from "../components/excel/Excel"
import { Formula } from "../components/formula/Formula"
import { Header } from "../components/header/Header"
import { Table } from "../components/table/Table"
import { Toolbar } from "../components/toolbar/Toolbar"
import { createStore } from "../core/createStore"
import { Page } from "../core/Page"
import { debounce, storage } from "../core/utils"
import { rootReducer } from '../redux/rootReducer'
import { normalizeInitialState } from '../core/initialState'
import { $ } from "../core/dom"

function getStorageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const state = storage(getStorageName(this.params)).get()
        const store = createStore(rootReducer, normalizeInitialState(state))

        const stateListener = debounce(state => {
            storage(getStorageName(this.params)).set(state)
        }, 300)

        store.subscribe(stateListener)
        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return $(this.excel.getRoot())
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}