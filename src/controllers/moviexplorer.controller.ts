import { Request, Response } from "express"

//@ts-ignore
const moviexplorer = (req: Request, res: Response) => {
    res.render("moviexplorer")
}

export default moviexplorer