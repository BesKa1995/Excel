import { storage } from "../core/utils"

export function toHTML(key) {
    const model = storage(key).get()
    const id = key.split(':')[1]
    return `
         <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index)
        if (!key.includes('excel')) {
            continue
        }

        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>You have not created any tables yet</p>`
    }

    return `
        <div class="db__list-header">
            <span>Title</span>
            <span>Opening time</span>
        </div>
        <ul class="db__list">
        ${keys.map(toHTML).join('')}
        </ul>`
}

