using System.ComponentModel.DataAnnotations;
using Volga.Infrastructure.Enums;

namespace Volga.Infrastructure.Dtos.User;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    [Required, Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
    [Required]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    public string LastName { get; set; } = string.Empty;
    [Required, EnumDataType(typeof(Gender))]
    public Gender Gender { get; set; }
    [Required, DataType(DataType.Date)]
    public DateTime BirthDate { get; set; }
    [Required]
    [RegularExpression(@"[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z]{2,4}")]
    public string Email { get; set; } = string.Empty;
}