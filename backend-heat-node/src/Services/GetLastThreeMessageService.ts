import { prisma } from '../Prisma';

class GetLastThreeMessageService {
    async execute() {
        const messages = await prisma.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            }, 
            include: {
                user: true
            }
        });

        return messages;
    };
};

export { GetLastThreeMessageService };