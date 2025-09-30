import { isValidId } from "./helperFunctions.js"

const transientState = {
    paintId: 0,
    technologyId: 0,
    interiorId: 0,
    wheelId: 0
}

let customerInfo = {
    firstName: "",
    lastName: "",
    email: ""
}

export const getTransientState = () => {
    return { ...transientState }
}

export const resetTransientState = () => {
    transientState.paintId = 0
    transientState.technologyId = 0
    transientState.interiorId = 0
    transientState.wheelId = 0
}

export const resetCustomerInfo = () => {
    customerInfo.firstName = ""
    customerInfo.lastName = ""
    customerInfo.email = ""
}

export const setPaintChoice = (chosenPaint) => {
    transientState.paintId = parseInt(chosenPaint)
    console.log("transientState", transientState)
}

export const setTechnologyChoice = (chosenTechnology) => {
    transientState.technologyId = parseInt(chosenTechnology)
    console.log("transientState", transientState)
}

export const setInteriorChoice = (chosenInterior) => {
    transientState.interiorId = parseInt(chosenInterior)
    console.log("transientState", transientState)
}

export const setWheelChoice = (chosenWheelDesign) => {
    transientState.wheelId = parseInt(chosenWheelDesign)
    console.log("transientState", transientState)
}