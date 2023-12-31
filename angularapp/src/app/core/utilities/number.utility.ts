export class NumberUtility
{
	public static preventNegativeFloatOnInput(e: Event | KeyboardEvent | ClipboardEvent): void
	{
		let elm = (e.target as HTMLInputElement);
		if (e instanceof KeyboardEvent && e.code && e.code === 'Minus') e.preventDefault();
		if (parseFloat(elm.value) < 0) e.preventDefault();
		if (e instanceof ClipboardEvent)
		{
			let data: string | undefined = e.clipboardData?.getData('Text');
			if (data && parseFloat(data) < 0)
			{
				e.preventDefault();
			}
		}
	}
}