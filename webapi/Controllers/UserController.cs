using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

public class UserController : BaseAPIController
{
	[Authorize]
	[HttpGet("Data")]
	public IActionResult Get()
	{
		return Ok();
	}

	[AllowAnonymous]
	[HttpPost("Login")]
	public IActionResult Login()
	{
		return Unauthorized();
	}

	[AllowAnonymous]
	[HttpPost("Register")]
	public IActionResult Register()
	{
		return Unauthorized();
	}

	[Authorize]
	[HttpGet("Logout")]
	public IActionResult Logout()
	{
		return Unauthorized();
	}

}