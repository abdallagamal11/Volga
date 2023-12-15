export abstract class BaseModel<T>
{
	constructor(value?: Partial<T>)
	{
		Object.assign(this, value);
	}
}