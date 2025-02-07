import type { Schema } from '../../data/resource'
type handlerType = Schema['getWeather']['functionHandler']

export const handler: handlerType = async (event) => {
    const city = event.arguments.city
    if (city === 'London') {
        return {
            value: 10,
            unit: 'C'
        }
    }
    else return {
        value: 30,
        unit: 'C'
    }

}