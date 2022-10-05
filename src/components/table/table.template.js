import { defaultStyles } from "../../constants"
import { parse } from "../../core/parse"
import { toInlineStyles } from "../../core/utils"

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const CODES = {
    A: 65,
    Z: 90
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {

    return function(_, col) {
        const id = `${row}:${col}`
        const data = state.dataState[id] || ''
        const width = getWidth(state.colState, col)
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })

        return `
            <div 
                 class="cell" 
                 contenteditable 
                 data-col="${col}"
                 data-type="cell" 
                 data-id="${row}:${col}"
                 data-value="${data}" 
                 style="width:${width}; ${styles}"
                 >
                 ${parse(data)}
            </div>`
    }
}

function toChar(_, index) {
    return String.fromCodePoint(CODES.A + index)
}

function toColumn({ col, index, width }) {

    return `
    <div class="column" data-type="resizable" data-col="${index}" style="width:${width}">
      ${col}
      <div class="col-resize" data-resize="col">
      </div>
    </div>
  `
}

function createRow(index, content, state) {
    const height = getHeight(state, index)
    const resizer = index
        ? `<div class="row-resize" data-resize="row"></div>`
        : ''

    return `
    <div class="row"
      data-type="resizable"
      data-row="${index ? index : 0}"
      style="height:${height}"
      >
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div> 
    </div>
`
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col,
            index,
            width: getWidth(state.colState, index)
        }
    }
}


export function createTable(rowsCount = 15, state) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)

        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }
    return rows.join('')
}