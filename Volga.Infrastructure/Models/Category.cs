using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Volga.Infrastructure.Models;

public class Category
{
	[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int Id { get; set; }

	public int parentId { get; set; } = 0;

	[Required]
	public string Name { get; set; } = string.Empty;

	public string Description { get; set; } = string.Empty;

	public virtual ICollection<Product>? Products { get; set; }
}