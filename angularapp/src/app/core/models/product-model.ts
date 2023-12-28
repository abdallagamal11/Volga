export interface ProductModel
{
	id: number;
	categoryId: number;
	title: string;
	imageUrl: string;
	description: string;
	price: number;
	discount: number;
	stock: number;
	vendorId: number;
	vendorName: string;
	ratingCount: number;
	ratingSum: number;
	rating: number;
	priceAfterDiscount: number;
	ratingStars: number;
}