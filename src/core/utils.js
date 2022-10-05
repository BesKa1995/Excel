export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    //reversing values to get the correct range
    if (start > end) [start, end] = [end, start]
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function storage(key) {
    return {
        get() {
            return JSON.parse(localStorage.getItem(key))
        },

        set(data) {
            localStorage.setItem(key, JSON.stringify(data))
        },

        remove(key) {
            localStorage.removeItem(key)
        }
    }
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelCasetoDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelCasetoDashCase(key)}:${styles[key]}`).join(';')
}

export function debounce(fn, wait) {
    let timout
    return function(...args) {
        clearTimeout(timout)
        timout = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

export function isValidSelector(selector) {
    if (!selector) {
        throw new Error('Selector is not provided in the Router')
    }
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}


export function preventDefault(event) {
    event.preventDefault()
}