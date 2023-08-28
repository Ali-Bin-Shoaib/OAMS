import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { Notification, NotificationType, Prisma, UserType } from '@prisma/client';
import SuperJSON from 'superjson';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/next-auth-options';
import { Pages } from 'shared/links';
import { $enum } from 'ts-enum-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	let flag = false;
	$enum(UserType).map((x) => {
		if (session?.user.type === x) flag = true;
	});
	if (!flag) return res.status(STATUS_CODE.METHOD_NOT_ALLOWED).json({ msg: 'action not allowed' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const data: Notification = req.body;
				console.log('🚀 ~ file: index.ts:23 ~ handler ~ data:', data);
				if (!data) {
					const updateNotification: Prisma.NotificationUpdateManyArgs = {
						data: {
							isShown: true,
						},
					};

					const updatedNotification = await prisma.notification.updateMany(updateNotification);
					console.log('🚀 ~ file: index.ts:32 ~ handler ~ updatedNotification:', updatedNotification);
					return res.status(STATUS_CODE.OK).json({
						data: updatedNotification,
						msg: `Update all Notifications`,
					});
				}
				const updateNotification: Prisma.NotificationUpdateArgs = {
					data: {
						...data,
						isShown: true,
					},
					where: { id: data.id },
				};

				const updatedNotification = await prisma.notification.update(updateNotification);
				console.log('🚀 ~ file: index.ts:46 ~ handler ~ updatedNotification:', updatedNotification);
				return res.status(STATUS_CODE.OK).json({
					data: updatedNotification,
					msg: `Notification with id:${updatedNotification.id} was update successfully`,
				});
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		// case REQUEST_METHODS.DELETE: {
		// 	try {
		// 		const deletedHealth = await prisma.healthInfo.delete({ where: { id: ID } });
		// 		console.log('🚀 ~ file: [id].tsx:42 ~ handler ~ deletedHealth:', deletedHealth);
		// 		if (deletedHealth) {
		// 			console.log('++++++++++++++++++++ at TRUE');

		// 			return res.status(STATUS_CODE.OK).json({
		// 				data: deletedHealth,
		// 				msg: `Health info with id: ${deletedHealth.id}  was deleted successfully.`,
		// 			});
		// 		} else {
		// 			console.log('++++++++++++++++++++++++++ at else');
		// 			return res.status(STATUS_CODE.BAD_REQUEST).json(`failed to delete Health info with id : ${ID}`);
		// 		}
		// 	} catch (error) {
		// 		console.log('🚀 ~ file: [id].tsx:81 ~ handler ~ error:', error);
		// 		console.log('+++++++++++++++++++++++++++++++++++ at catch error');

		// 		return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Health info dose not exist :', error: error });
		// 	}
		// }
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log("🚀 ~ file: [id].tsx:64 ~ handler ~ 'GET notifications':");
			checkNotification();
			try {
				const notifications = await prisma.notification.findMany({ where: { isShown: false }, orderBy: { type: 'asc' } });
				const data = SuperJSON.stringify(notifications);
				console.log('🚀 ~ file: index.ts:75 ~ handler ~ notifications:', notifications.length);
				return res.status(STATUS_CODE.OK).json({ data: data, msg: 'all Notifications' });
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
const checkNotification = async () => {
	console.log('CheckNotification');
	const notifications = await prisma.notification.findMany();
	const healthInfo = await prisma.healthInfo.findMany();
	healthInfo.map(async (health) => {
		if ((await isNotificationCreated({ notifications, triggerUrl: `${Pages.HealthInfo.link}${health.id}` })) === false)
			createNotification({ type: NotificationType.Health, triggerUrl: `${Pages.HealthInfo.link}${health.id}` });
	});
	const attendance = await prisma.attendance.findMany({ where: { OrphanAttendance: { every: { isAttended: false } } } });
	console.log('🚀 ~ file: index.ts:90 ~ checkNotification ~ attendance:', attendance);
	attendance.map(async (attendance) => {
		if (
			(await isNotificationCreated({ notifications, triggerUrl: `${Pages.Attendance.link}${attendance.id}` })) === false
		)
			createNotification({ type: NotificationType.Attendance, triggerUrl: `${Pages.Attendance.link}${attendance.id}` });
	});

	const behaviorInfo = await prisma.behaviorCriteria.groupBy({ by: ['behaviorInfoId'], _avg: { evaluation: true } });
	console.log('🚀 ~ file: index.ts:98 ~ checkNotification ~ behaviorInfo:', behaviorInfo);
	behaviorInfo.map(async (behavior) => {
		if (
			(await isNotificationCreated({
				notifications,
				triggerUrl: `${Pages.BehaviorInfo.link}${behavior.behaviorInfoId}`,
			})) === false
		)
			createNotification({
				type: NotificationType.Behavior,
				triggerUrl: `${Pages.BehaviorInfo.link}${behavior.behaviorInfoId}`,
			});
	});

	const educationInfo = await prisma.educationInfo.groupBy({
		by: ['id'],
		where: { degree: { in: ['FAIL', 'ACCEPTED'] } },
	});
	console.log('🚀 ~ file: index.ts:115 ~ checkNotification ~ educationInfo:', educationInfo);
	educationInfo.map(async (education) => {
		if (
			(await isNotificationCreated({
				notifications,
				triggerUrl: `${Pages.EducationInfo.link}${education.id}`,
			})) === false
		)
			createNotification({
				type: NotificationType.Education,
				triggerUrl: `${Pages.EducationInfo.link}${education.id}`,
			});
	});

	const activityExecutionInfo = await prisma.orphanActivityExecution.groupBy({
		by: ['activityExecutionInfoId'],
		where: { evaluation: { lte: 2.5 } },
	});
	console.log('🚀 ~ file: index.ts:132 ~ checkNotification ~ activityExecutionInfo:', activityExecutionInfo);
	activityExecutionInfo.map(async (execution) => {
		if (
			(await isNotificationCreated({
				notifications,
				triggerUrl: `${Pages.ActivityExecution.link}${execution.activityExecutionInfoId}`,
			})) === false
		)
			createNotification({
				type: NotificationType.ActivityExecution,
				triggerUrl: `${Pages.ActivityExecution.link}${execution.activityExecutionInfoId}`,
			});
	});
	const date = new Date();
	const sponsorship = await prisma.sponsorship.findMany({
		where: { endDate: { lte: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()) } },
	});
	console.log('🚀 ~ file: index.ts:148 ~ checkNotification ~ sponsorship:', sponsorship);
	sponsorship.map(async (x) => {
		if (
			(await isNotificationCreated({
				notifications,
				triggerUrl: `${Pages.Sponsorships.link}${x.id}`,
			})) === false
		)
			createNotification({
				type: NotificationType.Sponsorship,
				triggerUrl: `${Pages.Sponsorships.link}${x.id}`,
			});
	});

	const orphan = await prisma.orphan.findMany({ where: { evaluation: { lte: 2.5 } } });
	console.log('🚀 ~ file: index.ts:163 ~ checkNotification ~ orphan:', orphan);
	orphan.map(async (x) => {
		if (
			(await isNotificationCreated({
				notifications,
				triggerUrl: `${Pages.Orphans.link}${x.id}`,
			})) === false
		)
			createNotification({
				type: NotificationType.Orphan,
				triggerUrl: `${Pages.Orphans.link}${x.id}`,
			});
	});
};

interface CreateNotification {
	type: NotificationType;
	triggerUrl: string;
	notifications: Notification[];
}
const createNotification = async ({ type, triggerUrl }: Pick<CreateNotification, 'triggerUrl' | 'type'>) => {
	console.log('🚀createNotification ');
	try {
		const createNotification: Prisma.NotificationCreateArgs = {
			data: { type, triggerUrl },
		};
		const createdNotification = await prisma.notification.create(createNotification);
		console.log('🚀 ~ file: index.ts:105 ~ createNotification ~ createdNotification:', createdNotification);
	} catch (error) {
		console.log('🚀 ~ file: index.ts:108 ~ createNotification ~ error:', error);
	}
};
const isNotificationCreated = async ({
	triggerUrl,
	notifications,
}: Pick<CreateNotification, 'triggerUrl' | 'notifications'>) => {
	console.log('🚀isNotificationCreated');
	try {
		console.log('🚀 ~ notifications:', notifications.length);
		if (notifications.length === 0) {
			console.log(false);
			return false;
		}
		return notifications.filter((notification) => notification.triggerUrl === triggerUrl).length !== 0;
	} catch (error) {
		console.log('🚀 ~ file: index.ts:130 ~ isNotificationCreated ~ error:', error);
		console.log(false);

		return false;
	}
};
