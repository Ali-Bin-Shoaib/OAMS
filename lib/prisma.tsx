import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from './prisma/generated/prisma-client-js';
// let prisma = new PrismaClient();
declare global {
	var cachedPrisma: PrismaClient;
}
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient();
	}
	prisma = global.cachedPrisma;
}

export default prisma;
