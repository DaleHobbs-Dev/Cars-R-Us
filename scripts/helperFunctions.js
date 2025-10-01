// Helper functions for validation and calculations

/**
 * Validate that an ID is a positive integer
 * @param {number} id
 * @returns {boolean} true if valid, false otherwise
 */
export const isValidId = (id) => {
    return typeof id === "number" && id > 0
}

/**
 * JS Doc for calculating total price
 * Look up option prices and return the total
 * @param {Object} selections - IDs for each option
 * @param {number} selections.paintId
 * @param {number} selections.technologyId
 * @param {number} selections.interiorId
 * @param {number} selections.wheelId
 * @returns {Promise<number>} total price
 */
export const calculateTotalPrice = async ({ paintId, technologyId, interiorId, wheelId }) => {
    try {
        // fetch all options in parallel
        const [paints, technologies, interiors, wheels] = await Promise.all([
            fetch("http://localhost:8088/paints").then(r => r.json()),
            fetch("http://localhost:8088/technologies").then(r => r.json()),
            fetch("http://localhost:8088/interiors").then(r => r.json()),
            fetch("http://localhost:8088/wheels").then(r => r.json())
        ])

        // find matching options
        const selectedPaint = paints.find(p => p.id === paintId)
        const selectedTech = technologies.find(t => t.id === technologyId)
        const selectedInterior = interiors.find(i => i.id === interiorId)
        const selectedWheel = wheels.find(w => w.id === wheelId)

        // sum up prices (fallback to 0 if missing)
        const total =
            (selectedPaint?.price || 0) +
            (selectedTech?.price || 0) +
            (selectedInterior?.price || 0) +
            (selectedWheel?.price || 0)

        return total
    } catch (error) {
        console.error("Error calculating total price:", error)
        return 0
    }
}


/**
 * Validate email format
 * @param {string} email
 * @returns {boolean} true if valid, false otherwise
 */
export const isValidEmail = (email) => {
    if (!email) return false
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email.trim())
}
