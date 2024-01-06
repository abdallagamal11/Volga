namespace Volga.Infrastructure.Dtos;

public class PagedDataDto<T>
{
	public List<T> Data { get; set; }

	public PaginationDto Pagination { get; set; }
}