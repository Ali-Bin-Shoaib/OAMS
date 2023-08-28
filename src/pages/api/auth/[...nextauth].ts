import NextAuth from 'next-auth';
import { authOptions } from './next-auth-options';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { calculateOrphanGeneralEvaluation } from './service';
import {
	Orphan,
	BehaviorInfo,
	BehaviorCriteria,
	EducationInfo,
	OrphanAttendance,
	OrphanActivityExecution,
} from '@prisma/client';

// export default NextAuth(authOptions);
export default async function AuthenticationHandler(req: NextApiRequest, res: NextApiResponse) {
	// checkNotification();
	updateEvaluation();
	return await NextAuth(req, res, authOptions);
}
interface JsonDataProps {
	orphans: (Pick<Orphan, 'id' | 'name' | 'evaluation'> & {
		BehaviorInfo: BehaviorInfo & { BehaviorCriteria: Pick<BehaviorCriteria, 'evaluation'>[] }[];
		EducationInfo: Pick<EducationInfo, 'degree'>[];
		OrphanAttendance: Pick<OrphanAttendance, 'isAttended'>[];
		OrphanActivityExecution: Pick<OrphanActivityExecution, 'isAttended' | 'evaluation'>[];
	})[];
}
const updateEvaluation = async () => {
	const orphans = await prisma.orphan.findMany({
		select: {
			id: true,
			name: true,
			evaluation: true,
			BehaviorInfo: { select: { BehaviorCriteria: { select: { evaluation: true } } } },
			EducationInfo: { select: { degree: true } },
			OrphanAttendance: { select: { isAttended: true } },
			OrphanActivityExecution: { select: { isAttended: true, evaluation: true } },
		},
	});
	orphans.map(async (x) => {
		const evaluation = calculateOrphanGeneralEvaluation(x as JsonDataProps['orphans'][0]);
		if (x.evaluation !== calculateOrphanGeneralEvaluation(x as JsonDataProps['orphans'][0]))
			await prisma.orphan.update({ where: { id: x.id }, data: { evaluation: evaluation } });
	});
};
