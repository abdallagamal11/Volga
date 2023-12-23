export interface CategoryModel
{
	id: number;
	parentId: number | null;
	name: string;
	description: string;
	//	products: Product[] | null;
	parentCategory: CategoryModel | null;
	childCategories: CategoryModel[] | null;
}