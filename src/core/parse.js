export function parse(value = '') {
    try {
        if (value.startsWith('=')) {
            return eval(value.slice(1))
        }
    } catch (error) {
        return value
    }
    return value

}