using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Volga.Infrastructure;
using Volga.Infrastructure.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = "Default";
	options.DefaultChallengeScheme = "Default"; // what action to do when unauthorized
}).AddJwtBearer("Default", options =>
{
	string keyInStr = builder.Configuration.GetValue<string>("SecretKey")!;
	byte[] keyInBytes = Encoding.ASCII.GetBytes(keyInStr);
	var key = new SymmetricSecurityKey(keyInBytes);

	options.TokenValidationParameters = new TokenValidationParameters
	{
		IssuerSigningKey = key,
		ValidateIssuer = false,
		ValidateAudience = false,
	};
});

builder.Services.AddIdentity<User, UserRole>().AddEntityFrameworkStores<VgContext>();

builder.Services.AddAuthorization(options =>
{
	options.AddPolicy("AdminPolicy", p => p.RequireClaim(ClaimTypes.Role, "Admin"));
});

builder.Services.AddControllers();

#region removethis
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
#endregion

builder.Services.AddDbContext<VgContext>(
	options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default"),
	v => v.MigrationsAssembly(typeof(VgContext).Assembly.FullName))
);

var app = builder.Build();

#region removethis
//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
#endregion

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
