namespace Volga.Infrastructure.Dtos.User;

public class LoginDto
{
	public string Username { get; set; } = string.Empty;
	public string Password { get; set; } = string.Empty;
	public bool IsPersistant { get; set; } = false;
}