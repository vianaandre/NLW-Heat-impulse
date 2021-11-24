import { prisma } from '../Prisma';
import { io } from '../app';

class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await prisma.message.create({
            data: {
                text,
                user_id
            }, 
            include: {
                user: true
            }
        });

        const infoMs = {
            text: message.text,
            id: message.id,
            user_id: message.user_id,
            created_at: message.created_at,
            user: message.user
        };

        io.emit("new_message", infoMs);

        return message;
    };
};

export { CreateMessageService };