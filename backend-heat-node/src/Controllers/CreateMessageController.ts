import { Request, Response } from "express";
import { CreateMessageService } from '../Services/CreateMessageService';

class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { message } = request.body;
        const { user_id } = request;

        const service = new CreateMessageService();
        const results = await service.execute(message, user_id);

        return response.json(results);
    }
};

export { CreateMessageController };