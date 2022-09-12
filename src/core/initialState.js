import { defaultStyles, defaultTitle } from "../constants"
import { storage } from "./utils"
const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
}



const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
})

export const initialState = storage('excel-state').get()
    ? normalize(storage('excel-state').get())
    : defaultState

