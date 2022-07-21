import { AppDataSource } from "../../data-source";
import { FakeData } from "../../mocks/fakeData";
import { DeleteUserService } from "./DeleteUserService";
import { GetUserService } from "./GetUserService";

describe('DeleteUserService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    const fakeData = new FakeData();
    const getUserService = new GetUserService();

    it('Should delete user if it exists', async () => {
        const deleteUserService = new DeleteUserService();
        
        const mockUser = await fakeData.createUser({
            email: 'teste3@gmail.com',
            cpf: '323.456.789.10',
            password: '123456',
            admin: false
        })

        const result = await deleteUserService.execute(mockUser.id);

        await expect(getUserService.execute(mockUser.id)).rejects.toThrowError(`User with id ${mockUser.id} does not exists`)
        expect(result.affected).toBe(1);
    })

    it('Should return error if user does not exist', async () => {
        const deleteUserService = new DeleteUserService();
        const result = await deleteUserService.execute('wrongid123');

        expect(result.affected).toBe(0);
    })
})