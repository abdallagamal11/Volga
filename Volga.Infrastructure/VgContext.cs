using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Volga.Infrastructure.Models;

namespace Volga.Infrastructure;

public class VgContext : IdentityDbContext<User, UserRole, int>
{
	public DbSet<Category> Categories { get; set; }
	public DbSet<Product> Products { get; set; }
	public DbSet<Order> Orders { get; set; }
	public DbSet<OrderLine> OrderLines { get; set; }
	public DbSet<UserReview> UserReviews { get; set; }
	public DbSet<Cart> Carts { get; set; }
	public DbSet<CartItem> CartItems { get; set; }

	public VgContext(DbContextOptions<VgContext> options, IConfiguration config) : base(options) { }
}