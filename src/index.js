import { Router } from './core/routes/Router'
import { DashBoard } from './pages/Dashboard'
import { ExcelPage } from './pages/ExcelPage'
import './scss/index.scss'

window.r = new Router('#app', {
    dashboard: DashBoard,
    excel: ExcelPage
})