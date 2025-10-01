import { InteriorOptions } from "./FabricOptions.js"
import { PaintOptions } from "./PaintOptions.js"
import { TechnologyOptions } from "./TechnologyOptions.js"
import { WheelOptions } from "./WheelOptions.js"
import { PlaceOrderButton } from "./OrderButton.js"
import { Orders, renderOrderSummary } from "./OrderSummary.js"

const container = document.querySelector("#container")

const render = async () => {
    const interiorChoicesHTML = await InteriorOptions()
    const paintChoicesHTML = await PaintOptions()
    const technologyChoicesHTML = await TechnologyOptions()
    const wheelChoicesHTML = await WheelOptions()
    const orderButtonHTML = PlaceOrderButton()
    const ordersHTML = await Orders()

    const composedHTML = `
    <article class="choices">
                <section class="choices__paint options">
                    <h2>Paint Options</h2>
                    ${paintChoicesHTML}
                </section>

                <section class="choices__technology options">
                    <h2>Technology Options</h2>
                    ${technologyChoicesHTML}
                </section>

                <section class="choices__fabric options">
                    <h2>Fabric Options</h2>
                   ${interiorChoicesHTML}
                </section>

                <section class="choices__wheel options">
                    <h2>Wheel Options</h2>
                    ${wheelChoicesHTML}
                </section>

                <section class="order__customer">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="customerFirstName" placeholder="Jane">

                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="customerLastName" placeholder="Doe">

                    <label for="email">Email</label>
                    <input type="email" id="email" name="customerEmail" placeholder="jane@example.com">
                </section>

            </article>

            <article class="order">
                <h2>Your Order Summary</h2>
                <section class="order__summary">
                    <!-- summary of selections -->
                </section>
                 <section class="order__message">
                    <!-- success/error messages will appear here -->
                </section>
                <section class="order__button">
                   ${orderButtonHTML}
                </section>
            </article>

            <article class="customOrders">
                <h2>Custom Car Orders</h2>
                <section class="customOrder__summary">
                    ${ordersHTML}
                </section>
            </article>
    `

    container.innerHTML = composedHTML

    import("./eventHub.js")

    await renderOrderSummary()
}

document.addEventListener("newOrderCreated", event => {
    console.log("New order created, re-rendering orders list...")
    render()
})

render()