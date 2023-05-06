import { Request, Response } from "express"

//@ts-ignore
const home = (req: Request, res: Response) => {
    res.render("home")
}

export default home