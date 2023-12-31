import { PaginationModel } from "./pagination-model";

export interface PagedDataModel<T>
{
	data: T[],
	pagination: PaginationModel
}