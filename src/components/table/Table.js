import { ExcelComponent } from "../../core/ExcelComponent"
import { createTable } from "./table.template"
import { resizeHander } from "./resizeHandler"
import { shouldResize } from "./table.functions"
export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
    this.colWidth = 120
    this.rowHeight = 24
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHander(this.$root, event)
    }
  }

  toHTML() {
    return createTable(20)
  }
}