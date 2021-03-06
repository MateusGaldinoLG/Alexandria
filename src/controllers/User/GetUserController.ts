import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "uuid";
import { GetUserService } from "../../services/User/GetUserService";

class GetUserController{
    async handle(req: Request, res: Response){
        const getUserService = new GetUserService();
        
        const {id} = req.body;

        if(!validate(id)){
            return res.status(400).json('id not in uuid format')
        }

        const user = await getUserService.execute(id);

        return res.status(200).json(instanceToPlain(user));
    }
}

export {GetUserController};