namespace Volga.Core.Dtos;

public class TokenDto
{
	public string Token { get; set; } = string.Empty;
	public DateTime Expire { get; set; }
}