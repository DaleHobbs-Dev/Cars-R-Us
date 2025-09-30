export const InteriorOptions = async () => {
    const response = await fetch("http://localhost:8088/interiors")
    const interiors = await response.json()

    let interiorOptionsHTML = `
        <label for="interior" class="form-label"> Interior Options: </label>
        <select id="interior" name="interior" class="form-select">
    `

    interiorOptionsHTML += `<option value="0">Select an interior option</option>`

    interiorOptionsHTML += interiors.map(interior => {
        return `<option value="${interior.id}">${interior.name}</option>`
    }).join("")

    interiorOptionsHTML += `</select>`

    return interiorOptionsHTML
}