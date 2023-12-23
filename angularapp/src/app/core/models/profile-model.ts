import { Gender } from "../enums/gender";

export interface ProfileModel
{
	username: string;
	password: string | null;
	firstName: string;
	lastName: string;
	gender: Gender;
	birthDate: string;
	email: string;
	phoneNumber: string | null;
	address: string | null;
}