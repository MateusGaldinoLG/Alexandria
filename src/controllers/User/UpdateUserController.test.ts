import { Request } from "express";
import { AppDataSource } from "../../data-source"
import { FakeData } from "../../mocks/fakeData";
import { makeMockResponse } from "../../mocks/MockResponse";
import { UpdateUserController } from "./UpdateUserController";

describe('UpdateUserController', () => {
    beforeAll(async ()=> {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users');
        await AppDataSource.destroy();
    })

    const fakeData = new FakeData();
    const updateUserController = new UpdateUserController();
    const response = makeMockResponse();

    it('Should return 200 if a user is updated', async () => {
        const mockUser = await fakeData.createUser({
            email: 'teste@gmail.com',
            cpf: '12345678910',
            password: '123456',
            admin: false
        })

        const request = {
            body: {
                email: mockUser.email,
                password: '123456',
                username: mockUser.username+"novo",
                dob: mockUser.date_of_birth
            }
        } as Request;

        await updateUserController.handle(request, response);

        expect(response.state.status).toBe(200);
    })

    it('Should change users username', async () => {
        const mockUser = await fakeData.createUser({
            email: 'teste2@gmail.com',
            cpf: '22345678910',
            password: '123456',
            admin: false
        })

        const request = {
            body: {
                email: mockUser.email,
                password: '123456',
                username: mockUser.username+"novo",
                dob: mockUser.date_of_birth
            }
        } as Request;

        await updateUserController.handle(request, response);

        expect((response.state.json as Record<string, any>).username).toBe(mockUser.username+"novo");
    })

    it('Should change users date of birth', async () => {
        const mockUser = await fakeData.createUser({
            email: 'teste3@gmail.com',
            cpf: '32345678910',
            password: '123456',
            admin: false
        })

        const request = {
            body: {
                email: mockUser.email,
                password: '123456',
                dob: Date.now().toLocaleString()
            }
        } as Request;

        await updateUserController.handle(request, response);

        expect((response.state.json as Record<string, any>).date_of_birth).not.toBe(mockUser.date_of_birth);
    })

    it('should return 400 if user email is not valid', async () => {
        const request = {
            body: {
                email: 'teste@gmailcom',
                password: '123456',
                username: 'teste',
            }
        } as Request;

        await updateUserController.handle(request, response);

        expect(response.state.status).toBe(400);        
    })
})