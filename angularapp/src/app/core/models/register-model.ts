import { Gender } from "../enums/gender";

export interface RegisterModel
{
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: Gender | number;
	birthDate: string;
}