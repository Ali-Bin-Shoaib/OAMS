export interface ORPHAN {
	id: number;
	name: String;
	gender: GENDER;
	birthplace: String;
	motherName: String;
	currentAddress: String;
	motherJob: String;
	liveWith: String;
	isMotherWorks: Boolean;
	birthdate: Date;
	fatherDeathDate: Date;
	joinDate: Date;
	evaluation: Number;
}
export enum GENDER{MALE="MALE",FEMALE="FEMALE"}