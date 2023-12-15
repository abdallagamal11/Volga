import { DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer
{
	override parse(url: string): UrlTree
	{

		return super.parse(url.toLowerCase());
	}
}

export const LowerCaseUrlSerializerProvider = {
	provide: UrlSerializer,
	useClass: LowerCaseUrlSerializer
};