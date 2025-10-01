import { isValidId, isValidEmail, calculateTotalPrice } from "./helperFunctions.js"

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

export const setCustomerFirstName = (name) => {
    customerInfo.firstName = name.trim()
    console.log("customerInfo", customerInfo)
}

export const setCustomerLastName = (name) => {
    customerInfo.lastName = name.trim()
    console.log("customerInfo", customerInfo)
}

export const setCustomerEmail = (email) => {
    customerInfo.email = email.trim()
    console.log("customerInfo", customerInfo)
}

export const getCustomerInfo = () => {
    return { ...customerInfo }
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

export const placeOrder = async () => {
    const { paintId, technologyId, interiorId, wheelId } = transientState
    const { firstName, lastName, email } = customerInfo

    // --- Car option validation ---
    const orderValid = isValidId(paintId) && isValidId(technologyId) && isValidId(interiorId) && isValidId(wheelId)
    if (!orderValid) {
        return { success: false, message: "❌ Please select all car options before placing an order." }
    }

    // --- Customer name validation ---
    if (!firstName || !lastName) {
        return { success: false, message: "❌ Please enter your first and last name." }
    }

    // --- Email validation ---
    if (!isValidEmail(email)) {
        return { success: false, message: "❌ Please enter a valid email address." }
    }
    // --- All validations passed, proceed with order placement ---

    console.log("Placing order with:", { ...transientState, ...customerInfo })

    // Step 1: create customer
    const postCustomer = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email })
    }

    const customerResponse = await fetch("http://localhost:8088/customers", postCustomer)
    if (!customerResponse.ok) throw new Error("Failed to save customer")

    const newCustomer = await customerResponse.json()

    // Step 2: calculate price
    const totalPrice = await calculateTotalPrice(transientState)

    // Step 3: create order
    const newOrder = {
        customerId: newCustomer.id,
        paintId,
        technologyId,
        interiorId,
        wheelId,
        orderDate: new Date().toISOString(),
        status: "pending",
        totalPrice
    }

    try {
        const postOrder = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder)
        }

        const response = await fetch("http://localhost:8088/orders", postOrder)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

        const newSubmission = await response.json()

        // notify other modules that a new order has been placed
        const customEvent = new CustomEvent("newOrderPlaced")
        document.dispatchEvent(customEvent)

        resetTransientState()
        resetCustomerInfo()

        return { success: true, data: newSubmission }
    }
    catch (error) {
        return { success: false, message: error.message }
    }
}