import { isEqual } from "../../core/utils"

function toButton({ icon, active, value }) {

    const json = JSON.stringify(value)
    const meta = `data-type="button" data-value='${json}'`
    return `
     <div class="button ${active ? 'active' : ''}" ${meta}>
       <span class="material-icons" ${meta}>
          ${icon}
       </span>
     </div>
  `
}

export function createToolbar(s) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: isEqual(s['textAlign'], 'left'),
            value: { textAlign: 'left' }
        },
        {
            icon: 'format_align_center',
            active: isEqual(s['textAlign'], 'center'),
            value: { textAlign: 'center' }
        },
        {
            icon: 'format_align_right',
            active: isEqual(s['textAlign'], 'right'),
            value: { textAlign: 'right' }
        },
        {
            icon: 'format_bold',
            active: isEqual(s['fontWeight'], 'bold'),
            value: {
                fontWeight: s['fontWeight'] === 'bold'
                    ? 'normal' : 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: isEqual(s['fontStyle'], 'italic'),
            value: {
                fontStyle: s['fontStyle'] === 'italic'
                    ? 'normal' : 'italic'
            }
        },
        {
            icon: 'format_underline',
            active: isEqual(s['textDecoration'], 'underline'),
            value: {
                textDecoration: s['textDecoration'] === 'underline'
                    ? 'none' : 'underline'
            }
        },
    ]

    return buttons.map(toButton).join('')
}