import { $ } from "../../core/dom"
import { defaultTitle } from "../../constants"
import { ExcelComponent } from "../../core/ExcelComponent"
import { debounce, storage } from "../../core/utils"
import { changeTitle } from "../../redux/actions"
import { ActiveRoute } from '../../core/routes/ActiveRoute'
export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input', 'click']
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.button === 'remove') {
            const decision = confirm('are you sure you want to delete this table')
            if (decision) {
                storage().remove('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }

    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle

        return `
      <input type="text" class="input" value="${title}">

      <div>
        <div class="button" data-button="remove">
          <span class="material-icons" data-button="remove">
            delete
          </span>
        </div>

        <div class="button" data-button="exit">
          <span class="material-icons" data-button="exit">
            exit_to_app
          </span>
        </div>
    `
    }
}