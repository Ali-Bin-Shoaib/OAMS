import { NextApiRequest, NextApiResponse } from 'next';
import { Contact, REQUEST_METHODS, STATUS_CODE } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { EmergencyContactInfo, Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const admin = await prisma.user.findFirst({ where: { type: 'ADMIN' } });
	let isCreate = false;
	let contact: EmergencyContactInfo;
	const ID = Number(req.query.id);
	console.log('🚀 ~ file: [id].tsx:11 ~ handler ~ ID:', ID);
	if (isNaN(ID)) isCreate = true;
	else contact = await prisma.emergencyContactInfo.findUnique({ where: { id: ID } });
	console.log('🚀 ~ file: [id].tsx:13 ~ handler ~ isCreate:', isCreate);
	if (!(ID || contact || isCreate)) return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'Contact dose not exist.' });
	const data: Contact = req.body;
	console.log('🚀 ~ file: [id].tsx:15 ~ handler ~ data:', data);
	const { id, Orphan, User, ...rest } = data;
	switch (req.method) {
		case REQUEST_METHODS.POST: {
			if (req.body === '') return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'request to server has no data.' });
			try {
				const createContact: Prisma.EmergencyContactInfoCreateArgs = {
					data: { Orphan: { connect: { id: Orphan.id } }, User: { connect: { id: admin.id } }, ...rest },
				};
				const newContact = await prisma.emergencyContactInfo.create(createContact);
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ newContact:', newContact);
				return res.end(res.status(STATUS_CODE.OK).json({ data: newContact, msg: 'new Contact was created successfully' }));
			} catch (error) {
				console.log('🚀 ~ file: create.tsx:16 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'error at creating new Contact', error: error });
			}
		}
		//* ************************UPDATE************************
		case REQUEST_METHODS.PUT: {
			if (req.body === '') return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: 'request to server has no data.' });

			try {
				const updateContact: Prisma.EmergencyContactInfoUpdateArgs = {
					data: {
						User: { connect: { id: User.id || admin.id } },
						Orphan: { connect: { id: Orphan.id } },
						...rest,
					},
					where: {
						id: id || ID,
					},
				};
				const updatedContact = await prisma.emergencyContactInfo.update(updateContact);
				console.log('🚀 ~ file: [id].tsx:41 ~ handler ~ updatedContact:', updatedContact);
				return res
					.status(STATUS_CODE.OK)
					.json({ data: updateContact, msg: `Contact with id:${updatedContact.id} was updated successfully` });
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:24 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ data: error, msg: 'Something went wrong.' });
			}
		}
		//* ************************DELETE************************

		case REQUEST_METHODS.DELETE: {
			try {
				const deletedContact = await prisma.emergencyContactInfo.delete({ where: { id: ID } });
				console.log('🚀 ~ file: [id].tsx:55 ~ handler ~ deletedContact:', deletedContact);
				if (deletedContact) {
					return res.status(STATUS_CODE.OK).json({
						data: deletedContact,
						msg: `Contact with id: ${deletedContact.id} was deleted successfully.`,
					});
				} else {
					return res.status(STATUS_CODE.BAD_REQUEST).json('failed to delete Contact with id :' + ID);
				}
			} catch (error) {
				console.log('🚀 ~ file: [id].tsx:49 ~ handler ~ error:', error);
				return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ msg: 'Contact dose not exist :', data: error });
			}
		}
		//* ************************GET************************
		case REQUEST_METHODS.GET: {
			console.log('getting Contact info');
			const id: string = req.query.id.toString();
			let orphanId: number;
			if (id.includes('orphanId')) {
				orphanId = Number(id.match(/\d+/)[0]);
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
						id: orphanId || ID,
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
