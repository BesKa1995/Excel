import { storage } from "../core/utils"

function getStorageName(param) {
    return 'excel:' + param
}

export class LocalStorageClient {
    constructor(name) {
        this.name = getStorageName(name)

    }

    save(state) {
        storage(this.name).set(state)
        return Promise.resolve()
    }

    get() {
        // return Promise.resolve(storage(this.name).get())

        return new Promise(resolve => {
            const state = storage(this.name).get()

            setTimeout(() => {
                resolve(state)
            }, 1000)
        })
    }
}
