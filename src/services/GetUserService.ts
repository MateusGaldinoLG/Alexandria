import { instanceToPlain } from "class-transformer";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { NotFoundError } from "../utils/errors/Errors";


class GetUserService{
    async execute(id: string){
        const userRepo = AppDataSource.getRepository(User).extend(User);

        const user = await userRepo.findOne({
            where: [
                {id: id}
            ]
        })

        if(!user){
            throw new NotFoundError(`User with id ${id} does not exists`);
        }

        return user;
    }
}

export {GetUserService};