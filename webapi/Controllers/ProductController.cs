using Microsoft.AspNetCore.Mvc;
using Volga.Core.Dtos;
using Volga.Core.Services;

namespace webapi.Controllers;

public class ProductController : BaseAPIController
{
	private ProductService productService;
	public ProductController(ProductService productService)
	{
		this.productService = productService;
	}

	[HttpGet("{id}")]
	public IActionResult GetById(int? id)
	{
		if (id == null) return NotFound(ModelState);
		ProductDto? data = productService.GetProductById(id);
		if (data == null) return NotFound();
		return Ok(data);
	}

	[HttpGet("recommended")]
	public IActionResult GetRecommendedProducts(int take = 0, int categoryId = 0)
	{
		if (take > 50) take = 50;
		return Ok(productService.GetRecommendedProducts(take, categoryId));
	}
}