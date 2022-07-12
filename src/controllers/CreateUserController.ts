import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { v4 as uuid } from "uuid";
import { isValidCpf, isValidEmail, isValidPassword } from "../utils/validations/userValidator";
import { instanceToPlain } from "class-transformer";

class CreateUserController{
    async handle(req: Request, res: Response){
        const createUserService = new CreateUserService();

        const {email, username, cpf, password, admin, date_of_birth} = req.body;

        const id = uuid();

        if(!isValidEmail(email)){
            return res.status(400).json('invalid e-mail')
        }
        
        if(!isValidCpf(cpf)){
            return res.status(400).json('invalid cpf')
        }

        const isPasswordValid = isValidPassword(password);
        
        if(!(isPasswordValid[0])){
            return res.status(400).json(isPasswordValid[1]);
        }

        const user = await createUserService.execute({id, username, email, cpf, password, admin, dob: date_of_birth});

        return res.status(201).json(instanceToPlain(user));
    }
}

export {CreateUserController};