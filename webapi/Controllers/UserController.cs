using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volga.Core.Dtos;
using Volga.Core.Services;

namespace webapi.Controllers;

public class UserController : BaseAPIController
{
	private readonly AuthService _authService;

	public UserController(AuthService authService)
	{
		_authService = authService;
	}

	[Authorize]
	[HttpGet("Profile")]
	public async Task<IActionResult> Profile()
	{

		return Ok();
	}

	[AllowAnonymous]
	[HttpPost("Login")]
	public async Task<IActionResult> Login(LoginDto loginDto)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
		TokenDto? tokenDto = await _authService.AuthenticateUserAsync(loginDto.Username, loginDto.Password, loginDto.IsPersistant);
		if (tokenDto == null) return BadRequest(ModelState);

		return Ok(tokenDto);
	}

	[AllowAnonymous]
	[HttpPost("Register")]
	public async Task<IActionResult> Register(RegisterDto registerDto)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
		bool success = await _authService.RegisterUserAsync(registerDto);
		if (!success) return BadRequest(ModelState);
		return Ok();
	}
}