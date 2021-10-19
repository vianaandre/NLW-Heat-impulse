import 'dotenv/config';
import axios from 'axios';
import { prisma } from '../Prisma';
import { sign } from 'jsonwebtoken';

interface IAAccessTokenResponseProps {
    access_token: string;
};

interface IUserResponseProps {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
};

class AutheticateUserService {
    async execute(code: string) {
        const url = 'https://github.com/login/oauth/access_token';

        const { data: AcessToken } = await axios.post<IAAccessTokenResponseProps>(url,null, {
           params: {
            client_id: process.env.GITHUB_KEY_ID, 
            client_secret: process.env.GITHUB_KEY_SECRET,
            code,
           },
           headers: {
               Accept: 'application/json'
           }
        });

        const response = await axios.get<IUserResponseProps>('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${AcessToken.access_token}`  
            }
        });

        const { id, name, login, avatar_url } = response.data;

        let user = await prisma.user.findFirst({
            where: {
                github_id: id
            }
        });

        if(!user) {
            user = await prisma.user.create({
                data: {
                    github_id: id, 
                    name: name,
                    login: login,
                    avatar_url: avatar_url
                }
            });
        };

        const token = sign(
            {
                user: {
                    name: name,
                    avatar_url: avatar_url,
                    id: id
                }
             },
             process.env.JWT_KEY_TOKEN,
             {
                 subject: user.id,
                 expiresIn: '1d'
             }
        );

        return { token, user };

    };
};

export { AutheticateUserService };