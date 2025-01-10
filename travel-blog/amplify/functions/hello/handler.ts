import type { Handler } from 'aws-lambda';
import type { Schema } from "../../data/resource"

type handlerType = Schema['sayHello']['functionHandler']

export const handler: handlerType = async (event, context) => {

    const { name } = event.arguments
    // return typed from `.returns()`
    return `Hello, ${name}!`
};