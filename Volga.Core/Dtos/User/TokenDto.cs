namespace Volga.Core.Dtos.User;

public class TokenDto
{
    public string Token { get; set; } = string.Empty;
    public long Expire { get; set; }
}