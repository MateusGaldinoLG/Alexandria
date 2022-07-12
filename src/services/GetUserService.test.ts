import { AppDataSource } from "../data-source";
import { FakeData } from "../utils/fakeData/fakeData";
import { GetUserService } from "./GetUserService";


describe('GetUserService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    const fakeData = new FakeData();

    it('Should return the user given its id', async () => {
        const getUserService = new GetUserService();

        const mockUser = await fakeData.createUser({
            email: 'teste3@gmail.com',
            cpf: '323.456.789.10',
            password: '123456',
            admin: false
        })

        const result = await getUserService.execute(mockUser.id);

        expect(result).toHaveProperty(['id']);
        expect(result).toHaveProperty(['username']);
        expect(result).toHaveProperty(['email']);
        expect(result).toHaveProperty(['cpf']);
        expect(result).toHaveProperty(['borrowed']);
        expect(result).toHaveProperty(['date_of_birth']);
        expect(result).toHaveProperty(['password']);
        expect(result).toHaveProperty(['admin'])   
    })

    it('Should throw error if user does not exist', async () => {
        const getUserService = new GetUserService();

        await expect(getUserService.execute('wrongid123')).rejects.toThrowError('User with id wrongid123 does not exists')
    })
})