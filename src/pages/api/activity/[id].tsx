import { NextApiRequest, NextApiResponse } from 'next';
import { _ActivityInfo, _Orphan, REQUEST_METHODS, STATUS_CODE } from '../../../../types/types';
import prisma from '../../../../lib/prisma';
import { ActivityGoal, ActivityInfo, GoalInfo, Orphan, User } from '@prisma/client';
// export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const ID = Number(req.query.id);
	console.log("🚀 ~ file: [id].tsx:9 ~ handler ~ ID:", ID);
	const activity = await prisma.activityInfo.findUnique({ where: { id: ID } });
	console.log("🚀 ~ file: [id].tsx:11 ~ handler ~ activity:", activity);
	if (!(ID || activity))
		return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'activity dose not exist.' });
	switch (req.method) {
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			try {
				const activity: (ActivityInfo & {
					ActivityGoal: (ActivityGoal & {
						GoalInfo: GoalInfo;
					})[];
					User: User;
				}) = req.body;

				console.log("🚀 ~ file: [id].tsx:19 ~ handler ~ activity:", activity);
				const { User, ActivityGoal, ...activityInfo } = activity
				console.log("🚀 ~ file: [id].tsx:27 ~ handler ~ activityInfo:", activityInfo);
				console.log("🚀 ~ file: [id].tsx:27 ~ handler ~ ActivityGoal:", ActivityGoal);
				console.log("🚀 ~ file: [id].tsx:27 ~ handler ~ User:", User);
				const updatedActivity = await prisma.activityInfo.upsert({
					where: {
						id: activity.id // Find or create the activityInfo record with id 1
					},
					data: {
						create: { // Data for the new activityInfo record if it does not exist
							...activityInfo,
							User: { // Connect to the existing user
								connect: {
									id: User.id
								}
							},
							activityGoal: { // Create the activityGoal relation
								create: ActivityGoal.map(ag => ({ // Use map to iterate over the array of goals
									goalInfo: ag.GoalInfo.id ? { // Check if the goal has an id
										connect: { // If yes, connect to the existing goal
											id: ag.GoalInfo.id
										}
									} : { // If not, create a new goal
										create: {
											...ag.GoalInfo
										}
									}
								}))
							}
						},
						update: { // Data for the existing activityInfo record if it does exist
							...activityInfo, // Update the activityInfo fields
							user: { // Update the user relation
								update: {
									...User
								}
							},
							activityGoal: { // Update the activityGoal relation
								updateMany: { // Use updateMany to update multiple existing goals
									data: ActivityGoal.filter(ag => ag.GoalInfo.id), // Use filter to get only the goals with an id
									where: { // Use a filter to match the records by ids
										activityInfoId_goalInfoId: {
											activityInfoId: activity.id,
											goalInfoId: {
												in: ActivityGoal.filter(ag => ag.GoalInfo.id).map(ag => ag.GoalInfo.id) // Use filter and map to get an array of goal ids
											}
										}
									}
								},
								connectOrCreate: { // Use connectOrCreate to add a new goal to the activity or connect to an existing one
									create: {
										goalInfo: {
											create: {
												...ActivityGoal.find(ag => !ag.GoalInfo.id).GoalInfo // Use find to get the goal without an id
											}
										}
									},
									where: {
										activityInfoId_goalInfoId: {
											activityInfoId: activity.id,
											goalInfoId: ActivityGoal.find(ag => !ag.GoalInfo.id).GoalInfo.id // Use find to get the goal id
										}
									}
								},
								disconnect: { // Use disconnect to remove a goal from the activity
									goalInfo: {
										id: 2 // Use the id of the goal you want to remove
									}
								}
							}
						}
					}
				})
				console.log("🚀 ~ file: [id].tsx:54 ~ handler ~ updatedActivity:", updatedActivity);


				return res.status(STATUS_CODE.OK).json({ data: activity, msg: 'update success' });
			} catch (error) {
				console.log("🚀 ~ file: [id].tsx:24 ~ handler ~ error:", error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedActivity = await prisma.activityInfo.delete({ where: { id: ID } });
				console.log("🚀 ~ file: [id].tsx:31 ~ handler ~ deletedActivity:", deletedActivity);
				if (deletedActivity) {
					console.log('++++++++++++++++++++ at TRUE');

					return res.status(STATUS_CODE.OK).json({
						data: deletedActivity, msg: `activity with id: ${deletedActivity.id} and Title: ${deletedActivity.title} was deleted successfully.`
					});
				}
				else {
					console.log('++++++++++++++++++++++++++ at else');
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete activity with id :' + ID);
				}
			} catch (error) {
				console.log("🚀 ~ file: [id].tsx:81 ~ handler ~ error:", error);
				console.log('+++++++++++++++++++++++++++++++++++ at catch error');

				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Some thing went wrong :', error: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting orphan info');

			try {
				const requiredActivity = await prisma.activityInfo.findUnique({ where: { id: ID } });
				if (requiredActivity) return res.status(STATUS_CODE.OK).json({ requiredActivity: requiredActivity, msg: 'Activity Founded' });
				return res.status(STATUS_CODE.BAD_REQUEST).json('required Activity not founded with id:' + ID);
			} catch (error) {
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json('Some thing went wrong :' + error);
			}
		}
	}
}
