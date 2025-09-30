export const WheelOptions = async () => {
    const response = await fetch("http://localhost:8088/wheels")
    const wheels = await response.json()

    let wheelOptionsHTML = `
        <label for="wheel" class="form-label"> Wheel Options: </label>
        <select id="wheel" name="wheel" class="form-select">
        <option value="0">Select a wheel option</option>
    `

    wheels.forEach(wheel => {
        wheelOptionsHTML += `
            <option value="${wheel.id}">${wheel.name}</option>
        `
    })

    wheelOptionsHTML += `
        </select>
    `

    return wheelOptionsHTML
}