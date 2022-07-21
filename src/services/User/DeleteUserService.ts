import { AppDataSource } from "../../data-source"
import { User } from "../../entities/User"

class DeleteUserService{
    async execute(id: string){
        const userRepo = AppDataSource.getRepository(User).extend(User);
        
        const result = await userRepo.delete({
            id: id
        })

        return result;
    }
}

export {DeleteUserService}