export class ActiveRoute {
    static get path() {
        return location.hash.slice(1)
    }

    static get param() {
        return ActiveRoute.path.split('/')[1]
    }

    static navigate(path) {
        location.hash = path
    }

}