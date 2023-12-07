using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Globalization;
using System.Security.Claims;
using System.Text;
using Volga.Core;
using Volga.Core.Services;
using Volga.Infrastructure;
using Volga.Infrastructure.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Database
builder.Services.AddDbContext<VgContext>(
	options =>
		options.UseSqlServer(
			builder.Configuration.GetConnectionString("Default"),
			v => v.MigrationsAssembly(typeof(VgContext).Assembly.FullName)
		)
);
#endregion

#region Authentication

builder.Services.AddIdentity<VgUser, VgUserRole>(options =>
{
	options.Password.RequireUppercase = true;
	options.Password.RequireLowercase = true;
	options.Password.RequireNonAlphanumeric = true;
	options.Password.RequiredLength = 6;
	options.User.RequireUniqueEmail = true;

	options.Lockout.MaxFailedAccessAttempts = VgSettings.User.MaxFailedAccessAttempts;
	options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(VgSettings.User.LockoutTimeSpanInMinutes);

}).AddEntityFrameworkStores<VgContext>();


builder.Services.AddAuthorization(options =>
{
	options.AddPolicy("AdminPolicy", p => p.RequireClaim(ClaimTypes.Role, "Admin"));
});

builder.Services
	.AddAuthentication(options =>
	{
		options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

	})
	.AddJwtBearer(
		JwtBearerDefaults.AuthenticationScheme,
		options =>
		{
			byte[] keyInBytes = Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("Jwt:SecretKey")!);
			var key = new SymmetricSecurityKey(keyInBytes);

			options.TokenValidationParameters = new TokenValidationParameters
			{
				IssuerSigningKey = key,
				ValidIssuer = builder.Configuration.GetValue<string>("Jwt:Issuer"),
				ValidAudience = builder.Configuration.GetValue<string>("Jwt:Audience"),
				ValidateIssuer = true,
				ValidateAudience = true,
				ClockSkew = TimeSpan.Zero,
			};
		}
	);

#endregion

builder.Services.AddControllers();

#region Swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swagger =>
{
	swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
	{
		Name = "Authorization",
		Type = SecuritySchemeType.ApiKey,
		Scheme = "Bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
	});
	swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			  new OpenApiSecurityScheme
				{
					Reference = new OpenApiReference
					{
						Type = ReferenceType.SecurityScheme,
						Id = "Bearer"
					}
				},
				new string[] {}
		}
	});
});
//To Enable authorization using Swagger (JWT)

#endregion


builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
//builder.Services.AddMvc()
//		.AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
//		.AddDataAnnotationsLocalization();

builder.Services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
builder.Services.AddTransient<AuthService>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngularApp", builder =>
	{
		builder
		.SetIsOriginAllowed(x => true)
		.AllowAnyHeader()
		.AllowAnyMethod()
		.AllowCredentials();
	});
});

// =====================================

var app = builder.Build();

#region SwaggerUse
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	//	app.UseSwaggerUI();
	app.UseSwaggerUI(c =>
	{
		c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
		c.RoutePrefix = "";
	});
}
#endregion

app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();


var supportedCultures = new[]
{
		new CultureInfo("en-US"),
		// Add other supported cultures here
};
app.UseRequestLocalization(new RequestLocalizationOptions
{
	DefaultRequestCulture = new RequestCulture("en-US"),
	SupportedCultures = supportedCultures,
	SupportedUICultures = supportedCultures
});

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
