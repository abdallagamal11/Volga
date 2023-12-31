using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Volga.Infrastructure.Models;

public class Vendor
{
	[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; set; }
	[Required, StringLength(255)]
	public string Name { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	[Required, ForeignKey(nameof(VgUser))]
	public int UserId { get; set; }
	[ForeignKey("UserId")]
	public VgUser User { get; set; }
	public virtual HashSet<Product> Products { get; set; } = new HashSet<Product>();
}