import { setInteriorChoice, setPaintChoice, setTechnologyChoice, setWheelChoice, setCustomerFirstName, setCustomerLastName, setCustomerEmail } from "./TransientState.js";
import { handleOrderSubmission } from "./OrderButton.js";
import { renderOrderSummary } from "./OrderSummary.js";

const choiceSetters = {
    interior: setInteriorChoice,
    wheel: setWheelChoice,
    paint: setPaintChoice,
    technology: setTechnologyChoice,
    customerFirstName: setCustomerFirstName,
    customerLastName: setCustomerLastName,
    customerEmail: setCustomerEmail
}

document.addEventListener("change", async (event) => {
    const setter = choiceSetters[event.target.name]
    if (setter) {
        setter(event.target.value)
        await renderOrderSummary()
    }
    if (event.target.matches(".order__button")) {
        await handleOrderSubmission()
    }
})

document.addEventListener("click", (event) => {
    if (event.target.id === "orderButton") {
        handleOrderSubmission(event)
    }
})