import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

interface IUser {
    id: string;
    email: string;
    cpf: string;
    password: string;
    admin?: boolean;
    dob: string;
}

export class CreateUserService{
    async execute({id, email, cpf, password, admin, dob}: IUser){
        const userRepo = AppDataSource.getRepository(User).extend(User);

        const userAlreadyExists = await userRepo.findOne({
            where: [
                {email: email},
                {cpf: cpf}
            ]
        })

        if(userAlreadyExists){
            throw new Error('Email or cpf already used');
        }

        const passwordHash = await hash(password, 8);

        if(typeof admin === 'undefined'){
            admin = false;
        }

        const user = userRepo.create({
            id,
            email,
            cpf,
            password: passwordHash,
            admin,
            date_of_birth: dob,
            borrowed: false
        })

        await userRepo.save(user);

        return instanceToPlain(user);
    }
}