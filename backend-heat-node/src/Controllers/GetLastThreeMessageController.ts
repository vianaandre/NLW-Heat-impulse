import { Request, Response } from 'express';
import { GetLastThreeMessageService } from '../Services/GetLastThreeMessageService';

class GetLastThreeMessageController {
    async handle(request: Request, response: Response) {
        const service = new GetLastThreeMessageService();

        const results = await service.execute();

        return response.json(results);
    }
};

export { GetLastThreeMessageController };