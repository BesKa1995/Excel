import { $ } from "../../core/dom"
import { ExcelComponent } from "../../core/ExcelComponent"

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">
                fx
            <div class="hint">=1+1</div>
            </div>
            <div 
            id="formula" 
            class="input" 
            contenteditable
            spellcheck="false"
            placeholder="1231"
           ></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:input', $cell => {
            this.$formula.text($cell.data.value)
        })
    }

    onInput(event) {
        const text = $(event.target).text()
        this.$emit('formula:input', text)
    }

    onClick(event) { }

    storeChanged({ currentText }) {
        this.$formula.text(currentText)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }
}
