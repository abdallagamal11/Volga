export interface ProductListingFiltersModel
{
	discount:
	{
		showOnlyDiscountedItems: boolean;
	},
	price:
	{
		start: number | null;
		end: number | null;
	},
	rating:
	{
		showWithRating: number | undefined;
	};
	seller:
	{
		sellers: number[]
	},
	stock:
	{
		includeOutOfStock: boolean;
	}
}