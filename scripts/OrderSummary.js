import { getTransientState, getCustomerInfo } from "./TransientState.js";

const getResourceById = async (resourceArray, id) => {
    if (!id || id === 0) return null;
    const response = await fetch(`http://localhost:8088/${resourceArray}/${id}`);
    if (!response.ok) return null;
    return await response.json();
}

export const renderOrderSummary = async () => {
    const { paintId, technologyId, interiorId, wheelId } = getTransientState();
    const { firstName, lastName, email } = getCustomerInfo();

    // fetch details for each selected option
    const [paint, technology, interior, wheel] = await Promise.all([
        getResourceById('paints', paintId),
        getResourceById('technologies', technologyId),
        getResourceById('interiors', interiorId),
        getResourceById('wheels', wheelId)
    ])

    // build summary HTML
    const summary = `
    <h3>Customer Info</h3>
    <ul>
        <li>Name: ${firstName || "—"} ${lastName || ""}</li>
        <li>Email: ${email || "—"}</li>
    </ul>

    <h3>Car Configuration</h3>
    <ul>
        <li>Paint: ${paint ? paint.name : "None selected"}</li>
        <li>Technology: ${technology ? technology.name : "None selected"}</li>
        <li>Interior: ${interior ? interior.name : "None selected"}</li>
        <li>Wheels: ${wheel ? wheel.name : "None selected"}</li>
    </ul>`

    document.querySelector(".order__summary").innerHTML = summary;
}

export const Orders = async () => {
    const fetchResponse = await fetch(
        "http://localhost:8088/orders?_expand=paint&_expand=technology&_expand=interior&_expand=wheel&_expand=customer"
    )
    const orders = await fetchResponse.json()

    if (orders.length === 0) {
        return "<p>No custom car orders have been placed yet.</p>"
    }

    const ordersHTML = orders.map(order => {
        const totalCost = (
            (order.paint?.price || 0) +
            (order.technology?.price || 0) +
            (order.interior?.price || 0) +
            (order.wheel?.price || 0)
        ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

        return `
            <div class="customOrder" data-order-id="${order.id}">
                <h3>Order #${order.id}</h3>
                <p>Customer: ${order.customer?.firstName || "Unknown"} ${order.customer?.lastName || ""}</p>
                <p>Paint: ${order.paint?.name || "None selected"}</p>
                <p>Technology: ${order.technology?.name || "None selected"}</p>
                <p>Interior: ${order.interior?.name || "None selected"}</p>
                <p>Wheels: ${order.wheel?.name || "None selected"}</p>
                <p>Total Cost: ${totalCost}</p>
            </div>
        `
    }).join("")

    return ordersHTML
}