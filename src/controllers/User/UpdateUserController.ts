import { Request, Response } from "express";
import { UpdateUserService } from "../../services/User/UpdateUserService";
import { isValidEmail } from "../../utils/validations/userValidator";


class UpdateUserController{
    async handle(req: Request, res: Response){
        const updateUserService = new UpdateUserService();

        const {email, password, username, dob} = req.body;

        if(!isValidEmail(email)){
            return res.status(400).json('Email format invalid');
        }

        const user = await updateUserService.execute({email, password, username, dob});

        return res.status(200).json(user);
    }
}

export {UpdateUserController}