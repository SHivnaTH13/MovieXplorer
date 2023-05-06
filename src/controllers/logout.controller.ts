import { Request, Response } from "express"

//@ts-ignore
const logout = (req: Request, res: Response) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.redirect("/")
}

export default logout