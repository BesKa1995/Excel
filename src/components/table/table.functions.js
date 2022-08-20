import { range } from "../../core/utils"

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}


export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector($root, key, { row, col }) {
  const MIN_ROW = 0
  const MIN_COL = 0
  const MAX_ROW = $root.$el.children.length - 2
  const MAX_COL = $root.$el.children[0]
    .querySelector('.row-data')
    .children.length - 1

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_ROW ? MAX_ROW : row + 1
      // row++
      break
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_COL ? MAX_COL : col + 1
      // col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_COL ? MIN_COL : col - 1
      // col--
      break
    case 'ArrowUp':
      row = row - 1 < MIN_ROW ? MIN_ROW : row - 1
      // row--
      break
  }
  return `[data-id="${row}:${col}"]`
}
