export class DateUtility
{
	public static formatDateHtml(date: Date | string): string
	{
		if (typeof (date) == 'string')
		{
			date = new Date(date);
		}
		const year: string = date.getFullYear().toString();
		const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
		const day: string = date.getDate().toString().padStart(2, '0');

		return [year, month, day].join('-');
	}
}