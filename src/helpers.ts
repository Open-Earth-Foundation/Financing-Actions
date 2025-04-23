import { MATURITY } from "./types"

export const getColorPalette = (maturity: MATURITY) => {
    switch (maturity) {
        case MATURITY.initial:
            return 'red'
        case MATURITY.intermediate:
            return 'yellow'
        default:
            return 'green'
    }
}
