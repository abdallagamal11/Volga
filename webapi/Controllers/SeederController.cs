using Microsoft.AspNetCore.Mvc;
using Volga.Core;
using Volga.Infrastructure;

namespace webapi.Controllers;

public class SeederController : BaseAPIController
{
	VgContext _vgContext;
	public SeederController(VgContext vgContext)
	{
		_vgContext = vgContext;
	}

	[HttpGet("now")]
	public IActionResult Seeder()
	{

		//CategorySeeder categorySeeder = new CategorySeeder(_context);
		//categorySeeder.Seed(10);

		//VendorSeeder vendorSeeder = new VendorSeeder(_context);
		//vendorSeeder.Seed(10);

		//ProductSeeder productSeeder = new ProductSeeder(_context);
		//productSeeder.Seed(20);

		//UserReviewSeeder reviewsSeeder = new UserReviewSeeder(_context);
		//reviewsSeeder.Seed(10);

		//	GetProductsByCategoryId(10);

		//var categories = _vgContext.Categories.ToList();

		//int i = 0;
		//foreach (var category in categories)
		//{
		//	i++;
		//	category.ImgUrl = "https://picsum.photos/200/250?random=" + i;
		//}

		//		DatabaseSeeder.SeedProductUserInteractions(_vgContext);

		var ps = new ProductSeeder(_vgContext);
		ps.Seed(150);

		//		DatabaseSeeder.SeedProducts(_vgContext);
		DatabaseSeeder.SeedProductUserInteractions(_vgContext);
		var products = _vgContext.Products.ToList();

		foreach (var product in products)
		{
			product.RatingSum = _vgContext.UserReviews.Where(ur => ur.ProductId == product.Id).Sum(p => p.Rating);
			product.RatingCount = _vgContext.UserReviews.Where(ur => ur.ProductId == product.Id).Count();
			product.Views = _vgContext.ProductUserInteractions.Where(p => p.ProductId == product.Id).Sum(p => p.Views);
			product.Sales = _vgContext.ProductUserInteractions.Where(p => p.ProductId == product.Id).Sum(p => p.Sales);
		}

		_vgContext.SaveChanges();
		return Ok();
	}
}