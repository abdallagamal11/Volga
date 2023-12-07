using System.ComponentModel.DataAnnotations;
using Volga.Infrastructure.Enums;

namespace Volga.Core.Dtos;

public class ProfileDto
{
	public int? Id { get; set; }

	[Required]
	public string Username { get; set; } = string.Empty;

	[DataType(DataType.Password)]
	public string? Password { get; set; }
	[DataType(DataType.Password), Compare("Password")]
	public string? ConfirmPassword { get; set; }

	[Required]
	public string FirstName { get; set; } = string.Empty;
	[Required]
	public string LastName { get; set; } = string.Empty;

	[Required, EnumDataType(typeof(Gender))]
	public Gender Gender { get; set; }

	[Required, DataType(DataType.Date)]
	public DateTime? BirthDate { get; set; }

	[Required]
	[RegularExpression(@"[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z]{2,4}")]
	public string Email { get; set; } = string.Empty;

	[DataType(DataType.PhoneNumber)]
	[Phone]
	public string? PhoneNumber { get; set; }

	[StringLength(255)]
	public string? Address { get; set; }
}