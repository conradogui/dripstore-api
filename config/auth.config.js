import 'dotenv/config'

console.log(`token: ${process.env.AUTH_CONFIG}`);

export const secret = process.env.AUTH_CONFIG