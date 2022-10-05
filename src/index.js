import { Router } from './core/routes/Router'
import { DashBoard } from './pages/Dashboard'
import { ExcelPage } from './pages/ExcelPage'
import './scss/index.scss'
const $root = document.createElement('div')
document.body.append($root)
window.r = new Router($root, {
    dashboard: DashBoard,
    excel: ExcelPage
})