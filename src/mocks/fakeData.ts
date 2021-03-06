import { CreateUserService } from "../services/User/CreateUserService";
import { v4 as uuid } from "uuid";

interface IFakeUser{
    email: string;
    cpf: string;
    password: string;
    admin: boolean;
}

export class FakeData{
    createUserService = new CreateUserService();
    async createUser(fakeUser: IFakeUser){
        const user = await this.createUserService.execute({
            id: uuid(),
            username: 'user123',
            email: fakeUser.email,
            cpf: fakeUser.cpf,
            password: fakeUser.password,
            admin: fakeUser.admin,
            dob: Date.now().toLocaleString()
        })

        return user;
    }
}