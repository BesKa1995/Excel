export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }

  clear() {
    //remove selected class for prevCell if there is one
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}