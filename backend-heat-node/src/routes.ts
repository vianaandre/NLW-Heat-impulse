import { Router } from 'express';
import { AutheticateUserControllers } from './Controllers/AutheticateUserController';
import { ensureAutheticate } from './middleware/ensureAutheticate';
import { CreateMessageController } from './Controllers/CreateMessageController';
import { GetLastThreeMessageController } from './Controllers/GetLastThreeMessageController';
import { GetUserProfileController } from './Controllers/GetUserProfileController';

const router = Router();

router.post("/autheticate", new AutheticateUserControllers().handle);

router.post('/message', ensureAutheticate, new CreateMessageController().handle);

router.get('/message/getThreeMessage', new GetLastThreeMessageController().handle);

router.get('/profile', ensureAutheticate, new GetUserProfileController().handle)

export { router };