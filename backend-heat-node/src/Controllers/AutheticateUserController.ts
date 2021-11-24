import { Request, Response } from 'express';
import { AutheticateUserService } from '../Services/AutheticateUserService';

class AutheticateUserControllers {
    async handle(request: Request, response: Response) {
        const { code } = request.body;

        try {
            const service = new AutheticateUserService();
            const data = await service.execute(code);
    
            response.json({ data });
        }catch(err) {
            response.json({ erro: err.message });
        };
    };
};


export { AutheticateUserControllers };