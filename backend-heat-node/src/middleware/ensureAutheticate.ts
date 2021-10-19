import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayloadProps {
    sub: string
};

const ensureAutheticate = (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({ errorCode: "token.invalidad" })
    };
    
    const [ , token ] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_KEY_TOKEN) as PayloadProps;

        request.user_id = sub;

        return next();
    }catch(err) {
        return response.status(401).json({ erroCode: 'token.expired' });
    }
};

export { ensureAutheticate };