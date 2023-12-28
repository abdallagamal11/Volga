using Microsoft.AspNetCore.Mvc;
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

		//var categories = _vgContext.Categories.ToList();

		//int i = 0;
		//foreach (var category in categories)
		//{
		//	i++;
		//	category.ImgUrl = "https://picsum.photos/200/250?random=" + i;
		//}

		//		DatabaseSeeder.SeedProductUserInteractions(_vgContext);

		var products = _vgContext.Products.ToList();

		foreach (var product in products)
		{
			product.ratingSum = _vgContext.UserReviews.Where(ur => ur.ProductId == product.Id).Sum(p => p.Rating);
			product.ratingCount = _vgContext.UserReviews.Where(ur => ur.ProductId == product.Id).Count();
			product.Views = _vgContext.ProductUserInteractions.Where(p => p.ProductId == product.Id).Sum(p => p.Views);
			product.Sales = _vgContext.ProductUserInteractions.Where(p => p.ProductId == product.Id).Sum(p => p.Sales);
		}

		_vgContext.SaveChanges();
		return Ok();
	}
}