import { prisma } from '../Prisma';


class GetUserProfileService {
    async execute(userId: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            }
        });

        return user;
    };
};

export { GetUserProfileService };