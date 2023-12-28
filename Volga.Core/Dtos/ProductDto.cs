using System.ComponentModel.DataAnnotations;

namespace Volga.Core.Dtos;

public class ProductDto
{
	public int Id { get; set; }
	public int CategoryId { get; set; }
	[Required, MaxLength(255)]
	public string Title { get; set; } = string.Empty;
	[Required, MaxLength(255)]
	public string ImageUrl { get; set; } = string.Empty;
	[Required]
	public string Description { get; set; } = string.Empty;
	[Required]
	public double Price { get; set; } = 0;
	public double Discount { get; set; } = 0;
	public int Stock { get; set; } = 0;
	public int VendorId { get; set; }
	public string VendorName { get; set; }
	public int ratingCount { get; set; } = 0;
	public int ratingSum { get; set; } = 0;
	public int Views { get; set; } = 0;
	public int Sales { get; set; } = 0;
}
