export interface HttpErrorModel
{
	headers: any,
	status: number,
	statusText: string,
	url: string,
	ok: boolean,
	name: string,
	message: string,
	error: { [K in keyof string]: string | any }
}