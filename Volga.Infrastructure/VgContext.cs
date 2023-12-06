﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volga.Infrastructure.Models;

namespace Volga.Infrastructure;

public class VgContext : IdentityDbContext<VgUser, VgUserRole, int>
{
	public DbSet<Category> Categories { get; set; }
	public DbSet<Product> Products { get; set; }
	public DbSet<Order> Orders { get; set; }
	public DbSet<OrderLine> OrderLines { get; set; }
	public DbSet<UserReview> UserReviews { get; set; }
	public DbSet<Cart> Carts { get; set; }
	public DbSet<CartItem> CartItems { get; set; }

	//public VgContext(DbContextOptions options) : base(options) { }
	public VgContext(DbContextOptions<VgContext> options) : base(options) { }

	//protected override void OnConfiguring(DbContextOptionsBuilder builder)
	//{
	//	if (!builder.IsConfigured)
	//	{
	//		string conn = this.IsProduction ? Const.ProductionConnectionString : Const.LocalDBConnectionString;

	//		builder.UseSqlServer(conn);
	//	}

	//	base.OnConfiguring(builder);
	//}
}