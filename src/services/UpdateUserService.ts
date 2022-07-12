import { compare } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { NotFoundError } from "../utils/errors/Errors";

interface IAuthUser{
    email: string;
    password: string;
    username?: string;
    dob?: string;
}

class UpdateUserService{
    async execute({email, password, username, dob}: IAuthUser){
        const userRepo = AppDataSource.getRepository(User).extend(User);

        const user = await userRepo.findOne({
            where : [
                {email: email}
            ]
        })

        if(!user){
            throw new NotFoundError('Wrong email or password')
        }
        
        const isPasswordValid = await compare(password, user.password);
        
        if(!isPasswordValid){
            throw new NotFoundError('Wrong email or password')
        }

        user.username = username ? username : user.username;
        user.date_of_birth = dob ? new Date(dob) : user.date_of_birth;

        const newUser = await userRepo.save(user);

        return instanceToPlain(newUser);
    }
}

export {UpdateUserService};