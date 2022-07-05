import { AppDataSource } from "../data-source"
import { CreateUserService } from "./CreateUserService";
import {v4 as uuid} from 'uuid';
import { FakeData } from "../utils/fakeData/fakeData";


describe('CreateUserService', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    it(`Should return the created user with given properties`, async () => {
        const createUserService = new CreateUserService();

        const result = await createUserService.execute({
            id: uuid(),
            username: 'user123',
            email: 'teste@gmail.com',
            cpf: '123.456.789.10',
            password: '123456',
            admin: false,
            dob: Date.now().toLocaleString()
        })

        console.log(result);

        expect(result).toHaveProperty(['id']);
        expect(result).toHaveProperty(['username']);
        expect(result).toHaveProperty(['email']);
        expect(result).toHaveProperty(['cpf']);
        expect(result).toHaveProperty(['borrowed']);
        expect(result).toHaveProperty(['date_of_birth']);
        expect(result).not.toHaveProperty(['password'])
        expect(result).not.toHaveProperty(['admin'])        
    })

    it(`Should create user even without admin detail`, async () => {
        const createUserService = new CreateUserService();

        const result = await createUserService.execute({
            id: uuid(),
            username: 'user123',
            email: 'teste2@gmail.com',
            cpf: '223.456.789.10',
            password: '123456',
            dob: Date.now().toLocaleString()
        })

        console.log(result);

        expect(result).toHaveProperty(['id']);
        expect(result).toHaveProperty(['username']);
        expect(result).toHaveProperty(['email']);
        expect(result).toHaveProperty(['cpf']);
        expect(result).toHaveProperty(['borrowed']);
        expect(result).toHaveProperty(['date_of_birth']);
        expect(result).not.toHaveProperty(['password']);
        expect(result).not.toHaveProperty(['admin'])        
    })


    const fakeData = new FakeData();

    it('Should not create an user if an user with the same email is already registred', async () => {
        const createUserService = new CreateUserService();
        const mockUser = await fakeData.createUser({
            email: 'teste3@gmail.com',
            cpf: '323.456.789.10',
            password: '123456',
            admin: false
        })

        await expect(createUserService.execute({
            id: uuid(),
            username: 'user123',
            email: mockUser.email,
            cpf: '109.876.543.21',
            password: '123456',
            dob: Date.now().toLocaleString()
        })).rejects.toThrowError('Email or cpf already used');        
    })
    it('Should not create an user if an user with the same CPF is already registred', async () => {
        const createUserService = new CreateUserService();
        const mockUser = await fakeData.createUser({
            email: 'teste4@gmail.com',
            cpf: '423.456.789.10',
            password: '123456',
            admin: false
        })

        await expect(createUserService.execute({
            id: uuid(),
            username: 'user123',
            email: 'teste5@gmail.com',
            cpf: mockUser.cpf,
            password: '123456',
            dob: Date.now().toLocaleString()
        })).rejects.toThrowError('Email or cpf already used');        
    })
})