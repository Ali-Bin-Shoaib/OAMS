// import { PrismaClient } from '@prisma/client';
// declare global {
// 	var cachedPrisma: PrismaClient;
// }
// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
// 	prisma = new PrismaClient();
// } else {
// 	if (!global.cachedPrisma) {
// 		global.cachedPrisma = new PrismaClient();
// 	}
// 	prisma = global.cachedPrisma;
// }

// export default prisma;
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export default prisma;
