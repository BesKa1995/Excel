class Dom {

    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.innerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append({ $el }) {
        this.$el.appendChild($el)
        return this
    }

    attr(name, value) {
        if (value === '') {
            this.$el.setAttribute(name, value)
            return this
        }

        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    text(txt) {
        if (typeof txt !== 'undefined') {
            this.$el.textContent = txt
            return this
        } else if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }

        return this.$el.textContent.trim()
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    get data() {
        return this.$el.dataset
    }


    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    focus() {
        this.$el.focus()
        return this
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    findAll(selector) {
        return [...this.$el.querySelectorAll(selector)].map(el => {
            return $(el)
        })
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: Number(parsed[0]),
                col: Number(parsed[1])
            }
        }

        return this.data.id
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key]
            })
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}