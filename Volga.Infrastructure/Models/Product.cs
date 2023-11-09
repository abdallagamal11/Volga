using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Volga.Infrastructure.Models;

public class Product
{
	[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; set; }

	[ForeignKey("Category")]
	public int CategoryId { get; set; }

	[Required, MaxLength(255)]
	public string Title { get; set; } = string.Empty;

	[Required, MaxLength(511)]
	public string ImageUrl { get; set; } = string.Empty;

	[Required]
	public string Description { get; set; } = string.Empty;

	[Required]
	public double Price { get; set; } = 0;

	public double Discount { get; set; } = 0;

	[Required]
	public virtual Category Category { get; set; }
}