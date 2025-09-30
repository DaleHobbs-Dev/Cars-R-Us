import { InteriorOptions } from "./FabricOptions.js"
import { PaintOptions } from "./PaintOptions.js"
import { TechnologyOptions } from "./TechnologyOptions.js"
import { WheelOptions } from "./WheelOptions.js"

const container = document.querySelector("#container")

const render = async () => {
    const interiorChoicesHTML = await InteriorOptions()
    const paintChoicesHTML = await PaintOptions()
    const technologyChoicesHTML = await TechnologyOptions()
    const wheelChoicesHTML = await WheelOptions()

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
            </article>

            <article class="order">
                <h2>Your Order</h2>
                <section class="order__summary">
                    <!-- summary of selections -->
                </section>
                 <section class="order__message">
                    <!-- success/error messages will appear here -->
                </section>
                <section class="order__button">
                   <!-- order button will go here -->
                </section>
            </article>

            <article class="customOrders">
                <h2>Custom Car Orders</h2>
                <section class="customOrder__summary">
                    <!-- list of custom orders will render here -->
                </section>
            </article>
    `

    container.innerHTML = composedHTML

    import("./eventHub.js")
}

render()