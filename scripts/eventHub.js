// Central event hub for user interactions and state updates.
// Listens for changes in selections and button clicks, updating transient state and re-rendering the order summary.
import { setInteriorChoice, setPaintChoice, setTechnologyChoice, setWheelChoice, setCustomerFirstName, setCustomerLastName, setCustomerEmail } from "./TransientState.js";
import { handleOrderSubmission } from "./OrderButton.js";
import { renderOrderSummary } from "./OrderSummary.js";

// object mapping input names to their corresponding setter functions
const choiceSetters = {
    interior: setInteriorChoice,
    wheel: setWheelChoice,
    paint: setPaintChoice,
    technology: setTechnologyChoice,
    customerFirstName: setCustomerFirstName,
    customerLastName: setCustomerLastName,
    customerEmail: setCustomerEmail
}

// Handles all 'change' events across the document
document.addEventListener("change", async (event) => {

    // Get the appropriate setter function based on the input name
    const setter = choiceSetters[event.target.name]

    // If a setter function exists, update state and refresh the summary
    if (setter) {
        setter(event.target.value)
        // Re-render the order summary to reflect the updated selections
        await renderOrderSummary()
    }
})

// Handles 'click' events across the document
document.addEventListener("click", (event) => {
    // If the Place Order button was clicked, attempt to submit the order
    if (event.target.id === "orderButton") {
        // Call the function to handle order submission making POST request
        handleOrderSubmission(event)
    }
})