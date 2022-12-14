import { $ } from "../../core/dom"
import { ExcelStateComponent } from "../../core/ExcelStateComponent"
import { createToolbar } from "./toolbar.template"
import { defaultStyles } from "../../constants"

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }


    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
            this.setState(value)
        }
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }
}