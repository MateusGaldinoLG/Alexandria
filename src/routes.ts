import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserController } from "./controllers/GetUserController";

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.send('Hello World')
})

// user
router.post('/user', createUserController.handle);
router.get('/user', getUserController.handle);

export {router}