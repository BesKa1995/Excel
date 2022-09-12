export function resizeHandler($root, $resizer) {
    return new Promise(resolve => {

        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
        let type = $resizer.data.resize
        const sizeProp = type === 'col' ? 'bottom' : 'right'
        const colWidth = 120
        const rowHeight = 24
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

            resolve({
                type,
                value,
                id: $parent.data[type]
            })
        }

        document.ondblclick = e => {
            if (e.target.dataset.resize === 'col') {
                cells.forEach(cell => cell.css({ width: colWidth + 'px' }))
            } else if (e.target.dataset.resize === 'row') {
                $parent.css({ height: rowHeight + 'px' })
            }
        }
    })
}
