import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { makeMockResponse } from "../../mocks/MockResponse";
import { CreateUserController } from "./CreateUserController";


describe('CreateUserController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    const createUserController = new CreateUserController();
    const response = makeMockResponse();

    it('Should return 201 if a valid user is created', async () => {
        const request = {
            body: {
                email: 'teste@gmail.com',
                username: 'user123',
                cpf: '12345678910',
                password: '12345678',
                admin: false,
                date_of_birth: Date.now().toLocaleString()
            }
        } as Request;

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201);
    })

    it('Should return 400 if email format is invalid', async () => {
        const request = {
            body: {
                email: 'testegmail.com',
                cpf: '12345678910',
                username: 'user123',
                password: '12345678',
                admin: false,
                date_of_birth: Date.now().toLocaleString()
            }
        } as Request;

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(400);
        expect(response.state.json).toBe('invalid e-mail')
    })

    it('Should return 400 if cpf format is invalid', async () => {
        const request = {
            body: {
                email: 'teste@gmail.com',
                cpf: '1234567890',
                username: 'user123',
                password: '12345678',
                admin: false,
                date_of_birth: Date.now().toLocaleString()
            }
        } as Request;

        
        await createUserController.handle(request, response);
        
        console.log(response.state)
        expect(response.state.status).toBe(400);
        expect(response.state.json).toBe('invalid cpf');
    })
    
    it('Should return 400 if password format is invalid', async () => {
        const request = {
            body: {
                email: 'teste@gmail.com',
                cpf: '12345678910',
                username: 'user123',
                password: '1234567',
                admin: false,
                date_of_birth: Date.now().toLocaleString()
            }
        } as Request;
    
        await createUserController.handle(request, response);
    
        expect(response.state.status).toBe(400);
    })
})