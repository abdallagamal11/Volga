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

	[Required, MaxLength(255)]
	public string ImageUrl { get; set; } = string.Empty;

	public string Imgs { get; set; } = string.Empty;

	[Required]
	public string Description { get; set; } = string.Empty;

	[Required]
	public double Price { get; set; } = 0;

	public double Discount { get; set; } = 0;

	[Required]
	public int Stock { get; set; } = 0;

	[Required]
	public virtual Category Category { get; set; }

	public virtual HashSet<UserReview> UserReviews { get; set; } = new HashSet<UserReview>();

	[Required, ForeignKey(nameof(Vendor))]
	public int VendorId { get; set; }

	[ForeignKey("VendorId")]
	public virtual Vendor Vendor { get; set; }
	public virtual HashSet<ProductUserInteraction> ProductUserInteractions { get; set; } = new HashSet<ProductUserInteraction>();

	public int Views { get; set; } = 0;
	public int Sales { get; set; } = 0;
	public int RatingCount { get; set; } = 0;
	public int RatingSum { get; set; } = 0;
	[Timestamp]
	public byte[] TimestampFirstAdded { get; set; }
}