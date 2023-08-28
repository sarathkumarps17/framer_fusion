
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET!
export const generateToken = (data: { name: string, email: string }, expiryInHrs: number) =>
    jwt.sign({
        data
    }, secret, { expiresIn: `${expiryInHrs}h` })


export const verifyToken = (token: string | null) => {
    if (!token) return false
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        console.log(error)
        return false
    }
}
