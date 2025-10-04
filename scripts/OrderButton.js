// Handles the order button functionality, including placing orders and showing success/error messages.
import { placeOrder } from "./TransientState.js";

// Handles the order submission workflow
export const handleOrderSubmission = async () => {
    // Place the order (posts customer and order data)
    const result = await placeOrder();

    // Display feedback message to the user
    const messageSection = document.querySelector(".order__message");

    if (result.success) {
        messageSection.textContent = "✅ Your order has been placed successfully!";
        messageSection.className = "order__message order__message--success";
    } else {
        messageSection.textContent = `❌ ${result.message || "Something went wrong placing your order."}`;
        messageSection.className = "order__message order__message--error";
    }
};

// Returns the HTML for the Place Order button
export const PlaceOrderButton = () => {
    return `
        <button id="orderButton" type="button">Place Order</button>
    `;
};