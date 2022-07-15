import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserController } from "./controllers/GetUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.send('Hello World')
})

// user
router.post('/user', createUserController.handle);
router.get('/user', getUserController.handle);
router.patch('/user', updateUserController.handle);

export {router}