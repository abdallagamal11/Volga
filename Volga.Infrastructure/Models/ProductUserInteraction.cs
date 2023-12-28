using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Volga.Infrastructure.Models;

public class ProductUserInteraction
{
	[Required]
	public int ProductId { get; set; }
	public int Views { get; set; } = 0;
	public int Sales { get; set; } = 0;
	public int? UserId { get; set; } = null;
	[ForeignKey("ProductId")]
	public virtual Product Product { get; set; }
	[ForeignKey("UserId")]
	public virtual VgUser User { get; set; }
}