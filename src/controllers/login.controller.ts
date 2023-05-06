import { Request, Response } from "express"

//@ts-ignore
const login = (req: Request, res: Response) => {
    res.render("login")
}

export default login