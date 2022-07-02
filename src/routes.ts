import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const createUserController = new CreateUserController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.send('Hello World')
})

// user
router.get('/user', createUserController.handle);

export {router}