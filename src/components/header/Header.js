import { $ } from "../../core/dom"
import { defaultTitle } from "../../constants"
import { ExcelComponent } from "../../core/ExcelComponent"
import { debounce } from "../../core/utils"
import { changeTitle } from "../../redux/actions"

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options,
            listeners: ['input']
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle

        return `
      <input type="text" class="input" value="${title}">

      <div>
        <div class="button">
          <span class="material-icons">
            delete
          </span>
        </div>

        <div class="button">
          <span class="material-icons">
            exit_to_app
          </span>
        </div>
    `
    }
}