namespace Volga.Core.Dtos;

public class TokenDto
{
	public string Token { get; set; } = string.Empty;
	public long Expire { get; set; }
}