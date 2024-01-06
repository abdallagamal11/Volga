namespace Volga.Infrastructure.Dtos;

public class ProductListPageDto
{
	public List<ProductDto>? Data { get; set; }
	//	public Dictionary<int, string>? Sellers { get; set; } = new Dictionary<int, string>();
	public PaginationDto Pagination { get; set; }
}
