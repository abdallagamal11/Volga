using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Volga.Core.Dtos.User;
using Volga.Core.Services;
using Volga.Core.Validators.Attributes;

namespace webapi.Controllers;

public class UserController : BaseAPIController
{
	private readonly AuthService _authService;

	public UserController(AuthService authService)
	{
		_authService = authService;
	}

	[HttpGet("Profile")]
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public async Task<IActionResult> GetProfile()
	{
		ProfileDto? profileDto = await _authService.GetCurrentUserProfileAsync();
		if (profileDto == null) return Unauthorized();

		return Ok(profileDto);
	}

	[HttpPatch("Profile")]
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public async Task<IActionResult> UpdateProfile(ProfileDto? profileDto)
	{
		if (profileDto == null) return BadRequest(ModelState);

		ProfileDto? profileData = await _authService.UpdateCurrentUserProfileAsync(profileDto);
		if (profileData == null) return BadRequest(ModelState);

		profileData.Password = "";
		return Ok(profileData);
	}

	[AllowAnonymousOnly]
	[HttpPost("Login")]
	public async Task<IActionResult> Login(LoginDto loginDto)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
		TokenDto? tokenDto = await _authService.AuthenticateUserAsync(loginDto.Username, loginDto.Password, loginDto.IsPersistant);
		if (tokenDto == null) return BadRequest(ModelState);

		return Ok(tokenDto);
	}

	[AllowAnonymousOnly]
	[HttpPost("Register")]
	public async Task<IActionResult> Register(RegisterDto registerDto)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
		bool success = await _authService.RegisterUserAsync(registerDto);
		if (!success) return BadRequest(ModelState);
		TokenDto? tokenDto = await _authService.AuthenticateUserAsync(registerDto.Username, registerDto.Password, false);
		return Ok(tokenDto);
	}

	[HttpPost("Validation/CheckEmail")]
	public async Task<IActionResult> CheckEmail(string email)
	{
		if (!ModelState.IsValid) return BadRequest(false);
		if (await _authService.IsEmailExistent(email)) return BadRequest(false);
		else return Ok(JsonSerializer.Serialize(true));
	}

	[HttpPost("Validation/CheckUsername")]
	public async Task<IActionResult> CheckUsername(string username)
	{
		if (!ModelState.IsValid) return BadRequest(false);
		if (await _authService.IsUserNameExistent(username)) return BadRequest(false);
		else return Ok(JsonSerializer.Serialize(true));
	}
}