import { Request, Response } from 'express';
import { GetUserProfileService } from '../Services/GetUserProfileService';


class GetUserProfileController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const service = new GetUserProfileService();

        const results = await service.execute(user_id);
        
        return response.json(results);
    }
};

export { GetUserProfileController };