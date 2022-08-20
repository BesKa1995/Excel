import {
  isCell,
  matrix,
  nextSelector,
  shouldResize
} from "./table.functions"
import { ExcelComponent } from "../../core/ExcelComponent"
import { createTable } from "./table.template"
import { resizeHander } from "./resizeHandler"
import { TableSelection } from "./TableSelection"
import { $ } from "../../core/dom"

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHander(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup(cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  toHTML() {
    return createTable(10)
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

