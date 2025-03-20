export const questions= [{
    section: "Climate governance and planning",
    number: 1,
    text: "1. Does the municipality have a climate action plan or strategy for mitigation and adaptation to climate change?",
    weight: 2,
    options: [{label: "Yes", score: 1}, {label: "No", score: 0}]
}, {
    section: "Climate governance and planning",
    number: 2,
    text: "2. Is there an agency, secretariat, or team responsible for the climate agenda locally?",
    weight: 2,
    options: [{label: "Yes", score: 1}, {label: "No", score: 0}]
}, {
    section: "Climate governance and planning",
    number: 3,
    text: "3. Have discussions/relationships been established with the departments and/or stakeholders that should be involved?",
    weight: 1,
    options: [{label: "Yes", score: 1}, {label: "No", score: 0}]
},]

export const next = (current, responses) => {
    return questions[current.number]; // TODO skip structuring
}