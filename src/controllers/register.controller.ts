import { Request, Response } from "express"

//@ts-ignore
const register = (req: Request, res: Response) => {
    res.render("register")
}

export default register