namespace Volga.Core.Dtos;

public class ProductListPageDto<T>
{
	public List<T> Data { get; set; }
	public Dictionary<int, string>? Sellers { get; set; } = new Dictionary<int, string>();
	public PaginationDto Pagination { get; set; }
}
