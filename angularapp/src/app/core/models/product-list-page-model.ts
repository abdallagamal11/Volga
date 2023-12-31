import { PaginationModel } from "./pagination-model";
import { ProductModel } from "./product-model";

export interface ProductListPageModel
{
	data: ProductModel[],
	pagination: PaginationModel,
	sellers: { [K in keyof any]: string }
}