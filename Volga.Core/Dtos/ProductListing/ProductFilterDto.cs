namespace Volga.Core.Dtos.ProductListing;

public class ProductFilterDto
{
	public DiscountFilterDto? Discount { get; set; }
	public PriceFilterDto? Price { get; set; }
	public RatingFilterDto? Rating { get; set; }
	public SellerFilterDto? Seller { get; set; }
	public StockFilterDto? Stock { get; set; }
}