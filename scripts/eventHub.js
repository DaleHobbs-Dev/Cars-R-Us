import { setInteriorChoice, setPaintChoice, setTechnologyChoice, setWheelChoice } from "./TransientState.js";

const choiceSetters = {
    interior: setInteriorChoice,
    wheel: setWheelChoice,
    paint: setPaintChoice,
    technology: setTechnologyChoice
}

document.addEventListener("change", (event) => {
    const setter = choiceSetters[event.target.name]
    if (setter) {
        setter(parseInt(event.target.value))
    }
})