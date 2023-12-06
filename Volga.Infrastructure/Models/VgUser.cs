using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using Volga.Infrastructure.Enums;

namespace Volga.Infrastructure.Models;

public class VgUser : IdentityUser<int>
{
	[StringLength(100)]
	public string FirstName { get; set; } = string.Empty;
	[StringLength(100)]
	public string LastName { get; set; } = string.Empty;
	public Gender Gender { get; set; }
	public DateTime? BirthDate { get; set; }
}