import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { FakeData } from "../../mocks/fakeData";
import { makeMockResponse } from "../../mocks/MockResponse";
import { GetUserController } from "./GetUserController";

describe('GetUserController', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    })

    afterAll(async () => {
        await AppDataSource.query('DELETE FROM users')
        await AppDataSource.destroy();
    })

    const fakeData = new FakeData();
    const getUserController = new GetUserController();
    const response = makeMockResponse();

    it('Should return 200 if a user is found', async () => {
        const mockUser = await fakeData.createUser({
            email: 'teste3@gmail.com',
            cpf: '323.456.789.10',
            password: '123456',
            admin: false
        })

        const request = {
            body: {
                id: mockUser.id
            }
        } as Request;

        await getUserController.handle(request, response);

        expect(response.state.status).toBe(200);        
    })

    it('Should not search if id is not in valid format', async ()=>{
        const request = {
            body: {
                id: 'wrongid123'
            }
        } as Request;

        await getUserController.handle(request, response);

        expect(response.state.status).toBe(400);
        expect(response.state.json).toBe('id not in uuid format');
    })

    // it('Should return error if user is not found', async ()=>{
    //     const mockUser = await fakeData.createUser({
    //         email: 'teste3@gmail.com',
    //         cpf: '323.456.789.10',
    //         password: '123456',
    //         admin: false
    //     })

    //     const request = {
    //         body: {
    //             id: uuid()
    //         }
    //     } as Request;

    //     await getUserController.handle(request, response);

    //     expect(response.state.status).toBe(201);    
    // })
})