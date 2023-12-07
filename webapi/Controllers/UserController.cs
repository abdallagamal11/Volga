﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volga.Core.Dtos;
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
	public async Task<IActionResult> Profile()
	{
		ProfileDto? profileDto = await _authService.GetCurrentUserProfileAsync();
		if (profileDto == null) return Unauthorized();


		return Ok(profileDto);
	}

	[AllowAnonymousOnly]
	[HttpPost("Login")]
	public async Task<IActionResult> Login(LoginDto loginDto)
	{
		return NotFound();
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
		return Ok();
	}
}