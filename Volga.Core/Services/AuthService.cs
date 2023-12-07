using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Volga.Core.Dtos;
using Volga.Core.Utilities;
using Volga.Infrastructure.Models;

namespace Volga.Core.Services;

public class AuthService
{
	UserManager<VgUser> _userManager;
	IConfiguration _config;
	IActionContextAccessor _actionContextAccessor;

	public AuthService(UserManager<VgUser> userManager, IConfiguration config, IActionContextAccessor actionContextAccessor)
	{
		_userManager = userManager;
		_config = config;
		_actionContextAccessor = actionContextAccessor;
	}

	// Checking Login Credentials Existence for clean register
	public async Task<bool> IsUserNameExistent(string userName)
	{
		return await _userManager.FindByNameAsync(userName) != null;
	}

	public async Task<bool> IsEmailExistent(string email)
	{
		return await _userManager.FindByEmailAsync(email) != null;
	}

	// Login
	public async Task<TokenDto?> AuthenticateUserAsync(string userName, string password, bool persistant = false)
	{
		if (userName == null || password == null)
		{
			_actionContextAccessor.ActionContext?.ModelState.AddModelError("Username", "Required");
			_actionContextAccessor.ActionContext?.ModelState.AddModelError("Password", "Required");
			return null;
		}

		VgUser? user = await _userManager.FindByNameAsync(userName);
		if (user == null)
		{
			_actionContextAccessor.ActionContext?.ModelState.AddModelError("Username", "InvalidUsername");
			return null;
		}

		bool success = await _userManager.CheckPasswordAsync(user, password);
		if (!success)
		{
			_actionContextAccessor.ActionContext?.ModelState.AddModelError("Password", "InvalidPassword");
			return null;
		}
		TokenDto? token = await GenerateJwtTokenAsync(user, persistant);
		return token;
	}

	public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
	{
		if (await IsEmailExistent(registerDto.Email))
		{
			_actionContextAccessor.ActionContext!.ModelState.AddModelError("Email", "EmailExists");
			return false;
		}
		if (await IsUserNameExistent(registerDto.Username))
		{
			_actionContextAccessor.ActionContext!.ModelState.AddModelError("Username", "UserNameExists");
			return false;
		}

		VgUser user = new VgUser()
		{
			UserName = registerDto.Username,
			Email = registerDto.Email,
			FirstName = registerDto.FirstName,
			LastName = registerDto.LastName,
			Gender = registerDto.Gender,
			BirthDate = registerDto.BirthDate
		};

		IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);
		if (!result.Succeeded)
		{
			if (result.Errors.Count() > 0)
			{
				foreach (var error in result.Errors)
				{
					_actionContextAccessor.ActionContext!.ModelState.AddModelError(error.Code.ToString(), error.Description);
				}
			}
			return false;
		}
		return true;
	}

	public async Task<IList<Claim>?> GetClaimsAsync(VgUser? user, string? expiration = null)
	{
		if (user == null) return null;
		IList<Claim> userClaims = await _userManager.GetClaimsAsync(user);

		if (userClaims == null || userClaims.Count == 0)
		{
			var roles = await _userManager.GetRolesAsync(user);
			userClaims = new List<Claim>()
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Email, user.Email!),
				new Claim(ClaimTypes.Role, String.Join(',', roles))
			};
		}

		if (expiration != null)
		{
			userClaims.Add(new Claim(JwtRegisteredClaimNames.Exp, expiration));
		}
		return userClaims;
	}


	// <summary>
	// Generates Jwt Token To be used in Login process in API
	// </summary>
	public async Task<TokenDto?> GenerateJwtTokenAsync(VgUser? user, bool isPersistant = false)
	{
		if (user == null) return null;
		DateTime expiration = DateTime.Now.AddMinutes(
					isPersistant ? VgSettings.User.PersistentTokenExpireMinutes
					 : VgSettings.User.NormalTokenExpireMinutes);
		long expirationTimestamp = DatetimeUtility.FromDateTimeToUnix(expiration);

		var userClaims = await GetClaimsAsync(user, expirationTimestamp.ToString());
		if (userClaims == null) return null;

		var algorithm = SecurityAlgorithms.HmacSha256Signature;
		var secretKeyRaw = _config.GetValue<String>("Jwt:SecretKey")!;

		var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKeyRaw));
		var signingCredentials = new SigningCredentials(secretKey, algorithm);

		var jwtToken = new JwtSecurityToken(
			claims: userClaims,
			signingCredentials: signingCredentials,
			expires: expiration,
			issuer: _config.GetValue<String>("Jwt:Issuer"),
			audience: _config.GetValue<String>("Jwt:Audience")
		);

		string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

		return new TokenDto()
		{
			Token = token,
			Expire = expirationTimestamp
		};
	}

	public async Task<VgUser?> GetCurrentUserAsync()
	{
		ClaimsPrincipal? claimsPrincipal = _actionContextAccessor.ActionContext?.HttpContext.User;
		if (claimsPrincipal == null) return null;

		VgUser? user = await _userManager.GetUserAsync(claimsPrincipal);
		return user;
	}

	public async Task<ProfileDto?> GetCurrentUserProfileAsync()
	{
		VgUser? user = await GetCurrentUserAsync();
		if (user == null) return null;

		return new ProfileDto()
		{
			Id = user.Id,
			Username = user.UserName,
			FirstName = user.FirstName,
			LastName = user.LastName,
			Email = user.Email,
			Gender = user.Gender,
			BirthDate = user.BirthDate,
			PhoneNumber = user.PhoneNumber,
			Address = user.Address
		};
	}
}