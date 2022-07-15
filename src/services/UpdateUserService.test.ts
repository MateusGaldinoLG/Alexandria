import { AppDataSource } from "../data-source";
import { FakeData } from "../utils/fakeData/fakeData";
import { UpdateUserService } from "./UpdateUserService";


describe('UpdateUserService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    const fakeData = new FakeData();
    
    it('Should return the updated user with updated properties', async () => {
        const mockUser = await fakeData.createUser({
            email: 'teste3@gmail.com',
            cpf: '323.456.789.10',
            password: '123456',
            admin: false
        })

        const updateUserService = new UpdateUserService();

        console.log(mockUser);

        const newUser = await updateUserService.execute({
            email: mockUser.email,
            password: '123456',
            username:'newusername123'
        });

        expect(newUser.username).toBe('newusername123');
        expect(newUser.email).toBe(mockUser.email);
        expect(newUser.id).toBe(mockUser.id);
        expect(newUser.cpf).toBe(mockUser.cpf);
    })
})