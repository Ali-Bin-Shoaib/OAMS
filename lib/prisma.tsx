import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();
declare global {
	var cachedPrisma: PrismaClient;
}
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient();
	}
	prisma = global.cachedPrisma;
}

export default prisma;
