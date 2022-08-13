import { $ } from "../../core/dom"

export function resizeHander($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  const sizeProp = type === 'col' ? 'bottom' : 'right'
  let value
  $resizer.css({
    opacity: 1,
    [sizeProp]: '-50000px'

  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = delta + coords.width
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      value = delta + coords.height
      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = e => {
    document.onmousemove = null

    if (type === 'col') {
      cells.forEach(cell => cell.css({ width: value + 'px' }))
    } else {
      $parent.css({ height: value + 'px' })
    }

    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0
    })
  }
  document.ondblclick = e => {
    if (type === 'col') {
      cells.forEach(cell => cell.css({ width: this.colWidth + 'px' }))
    } else {
      $parent.css({ height: this.rowHeight + 'px' })
    }
  }
}
