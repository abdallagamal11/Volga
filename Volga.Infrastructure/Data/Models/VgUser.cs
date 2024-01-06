using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using Volga.Infrastructure.Enums;

namespace Volga.Infrastructure.Data.Models;

public class VgUser : IdentityUser<int>
{
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public DateTime? BirthDate { get; set; }
    [StringLength(255)]
    public string Address { get; set; } = string.Empty;
}