export const TechnologyOptions = async () => {
    const response = await fetch("http://localhost:8088/technologies")
    const technologies = await response.json()

    let technologyHTML = `<label for="technology">Choose a Technology Package</label>
    <select name="technology" id="technology" class="form-select">
    <option value="0">Select a technology package</option>`

    technologies.forEach(techChoice => {
        technologyHTML += `<option value="${techChoice.id}">${techChoice.name}</option>`
    })

    technologyHTML += `</select>`

    return technologyHTML
}