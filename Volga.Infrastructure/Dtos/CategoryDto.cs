namespace Volga.Infrastructure.Dtos;

public class CategoryDto
{
	public int Id { get; set; }
	public int? parentId { get; set; } = 0;
	public string Name { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public string ImgUrl { get; set; } = string.Empty;
	public virtual ICollection<ProductDto>? Products { get; set; }
	public virtual CategoryDto? ParentCategory { get; set; }
	public virtual ICollection<CategoryDto>? ChildCategories { get; set; }
}