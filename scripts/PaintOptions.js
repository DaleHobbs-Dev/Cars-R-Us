export const PaintOptions = async () => {
    const response = await fetch("http://localhost:8088/paints")
    const paints = await response.json()

    let paintOptionsHTML = `
    <label for="paint" class="form-label"> Paint Options: </label>
    <select id="paint" name="paint" class="form-select">
    `

    paintOptionsHTML += `<option value="0">Select a paint color</option>`

    paintOptionsHTML += paints.map(paint => {
        return `<option value="${paint.id}">${paint.name}</option>`
    }).join("")

    paintOptionsHTML += `</select>`

    return paintOptionsHTML
}