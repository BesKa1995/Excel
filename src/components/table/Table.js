import { $ } from "../../core/dom"
import { TableSelection } from './TableSelection'
import { ExcelComponent } from "../../core/ExcelComponent"
import { createTable } from "./table.template"
import { resizeHandler } from "./resizeHandler"
import { defaultStyles } from '../../constants'
import { applyStyle, changeStyles, changeText, tableResize } from "../../redux/actions"
import {
    isCell,
    matrix,
    nextSelector,
    shouldResize,
    shouldSelect
} from "./table.functions"
import { parse } from "../../core/parse"

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: [
                'mousedown',
                'keydown',
                'input',
                'mousemove',
                'mouseup'
            ],
            ...options
        })

        this.isMouseDown = false
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)

            this.$dispatch(applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })

        this.$on('formula:enter', () => {
            this.selectCell($cell)
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:input', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(changeStyles(styles))
    }

    async resizeTable($resizer) {
        try {

            const data = await resizeHandler(this.$root, $resizer)
            this.$dispatch(tableResize(data))
        } catch (error) {
            console.warn('Resize error', error)
        }
    }

    onMouseup() {
        this.isMouseDown = false
    }

    onMousemove(event) {
        const $target = $(event.target)
        if (shouldSelect($target, this.isMouseDown)) {
            const $target = $(event.target)
            const cells = matrix($target, this.selection.current)
                .map((id) => this.$root.find(`[data-id="${id}"]`))

            this.selection.selectGroup(cells)
        }
    }

    onMousedown(event) {
        this.isMouseDown = true
        const $target = $(event.target)

        if ($)
            if (shouldResize($target)) {
                this.resizeTable($target)
            } else if (isCell($target)) {
                if (event.shiftKey) {
                    const cells = matrix($target, this.selection.current)
                        .map((id) => this.$root.find(`[data-id="${id}"]`))
                    this.selection.selectGroup(cells)
                } else {
                    this.selectCell($target)
                }
            }
    }

    updateTextInStore(value) {
        this.$dispatch(changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }

    toHTML() {
        return createTable(10, this.store.getState())
    }

    onKeydown(event) {

        const keys = [
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp',
            'Enter',
            'Tab'
        ]

        const { key } = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(this.$root, key, id))
            this.selectCell($next)
        }
    }
}

