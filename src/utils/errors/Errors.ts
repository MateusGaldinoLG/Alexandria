import { NextFunction, Request, Response } from "express"

class NotFoundError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'NotFoundError'
    }
}

function handleErrorMiddleware(err: Error | NotFoundError, req: Request, res: Response, next: NextFunction){
    if(err instanceof NotFoundError){
        return res.status(404).json({
            error: err.message
        })
    }else if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server Error"
    })
}

export {handleErrorMiddleware, NotFoundError}