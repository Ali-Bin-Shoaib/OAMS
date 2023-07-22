import { NextApiRequest, NextApiResponse } from 'next';
import { Contact, REQUEST_METHODS, ROOM, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { EmergencyContactInfo, Prisma, Room } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let isCreate = false;
	let room: Room | null = null;
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:11 ~ handler ~ ID:', ID);
	if (isNaN(ID)) {
		if (req.query.id === 'create') isCreate = true;
	} else room = await prisma.room.findUnique({ where: { id: ID } });
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ isCreate:', isCreate);
	if (!(ID || room || isCreate)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'Room dose not exist.' });
	const data: ROOM = req.body;
	console.log('🚀 ~ file: [id].tsx:17 ~ handler ~ data:', data);
	const { id, Orphan, User, ...rest } = data;
	switch (req.method) {
		case REQUEST_METHODS.POST: {
			if (req.body === '') return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'request to server has no data.' });
			try {
				const createRoom: Prisma.RoomCreateArgs = {
					data: {
						Orphan: { connect: Orphan ? Orphan.map((x) => ({ id: x.id })) : undefined },
						User: { connect: { id: User?.id } },
						...rest,
					},
				};
				const newRoom = await prisma.room.create(createRoom);
				console.log('🚀 ~ file: [id].tsx:31 ~ handler ~ newRoom:', newRoom);
				return res.end(res.status(STATUS_CODE.OK).json({ data: newRoom, msg: 'new Room was created successfully' }));
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:34 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new Room', error: error });
			}
		}
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			if (req.body === '') return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'request to server has no data.' });

			try {
				const updateRoom: Prisma.RoomUpdateArgs = {
					data: {
						User: { connect: { id: User?.id } },
						Orphan: { connect: Orphan.map((x) => ({ id: x.id })) },
						...rest,
					},
					where: {
						id: id || ID,
					},
				};
				const updatedRoom = await prisma.room.update(updateRoom);
				console.log('🚀 ~ file: [id].tsx:41 ~ handler ~ updatedContact:', updatedRoom);
				return res
					.status(STATUS_CODE.OK)
					.json({ data: updateRoom, msg: `Room with id:${updatedRoom.id} was updated successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedRoom = await prisma.room.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:68 ~ handler ~ deletedRoom:', deletedRoom);
				if (deletedRoom)
					return res.status(STATUS_CODE.OK).json({
						data: deletedRoom,
						msg: `Room with id: ${deletedRoom.id} was deleted successfully.`,
					});
				else return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete Room with id :' + ID);
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:49 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Room dose not exist :', data: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting Room info');
			if (!req.query.id) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'request to server has no data.' });
			const id: string = req.query.id.toString();
			let orphanId: number;
			if (id.includes('orphanId')) {
				orphanId = Number(id.match(/\d+/)?.[0]);
				console.log('🚀 ~ file: [id].tsx:83 ~ handler ~ orphanId:', orphanId);
				try {
					const OrphanContacts = await prisma.emergencyContactInfo.findMany({
						where: {
							orphanId: orphanId,
						},
						select: {
							id: true,
							name: true,
							phone: true,
							Orphan: { select: { id: true, name: true } },
							User: { select: { id: true, name: true } },
						},
						orderBy: { id: 'asc' },
					});
					if (OrphanContacts.length != 0)
						return res.end(res.status(STATUS_CODE.OK).json({ data: OrphanContacts, msg: 'Orphan Contacts are founded' }));

					return res
						.status(STATUS_CODE.BAD_REQUEST)
						.json({ msg: `Orphan with id: ${orphanId} has no related contact info.` });
				} catch (error) {
					console.log('🚀 ~ file: [id].tsx:101 ~ handler ~ error:', error);
					return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Some thing went wrong :', data: error });
				}
			}
			try {
				const requiredContact = await prisma.emergencyContactInfo.findFirst({
					where: {
						id: ID,
					},
					select: {
						id: true,
						name: true,
						phone: true,
						Orphan: { select: { id: true, name: true } },
						User: { select: { id: true, name: true } },
					},
				});
				if (requiredContact)
					return res.end(res.status(STATUS_CODE.OK).json({ data: requiredContact, msg: 'Contact is founded' }));

				return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: `required Contact with id: ${ID} was not found.` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:101 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Some thing went wrong :', data: error });
			}
		}
	}
}
