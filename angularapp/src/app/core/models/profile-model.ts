import { Gender } from "../enums/gender";

export interface ProfileModel
{
	id: number;
	username: string;
	password: string | null;
	confirmPassword: string | null;
	firstName: string;
	lastName: string;
	gender: Gender;
	birthDate: string;
	email: string;
	phoneNumber: string | null;
	address: string | null;
}
