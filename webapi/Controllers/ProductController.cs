using Microsoft.AspNetCore.Mvc;
using Volga.Core.Dtos;
using Volga.Core.Enums;
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
	public async Task<IActionResult> GetRecommendedProducts(int take = 0, int categoryId = 0)
	{
		if (take == 0 || take > 50) take = 50;
		return Ok(await productService.GetRecommendedProductsAsync(take, categoryId));
	}

	[HttpGet("bycategory/{categoryId}")]
	public async Task<ActionResult<List<ProductDto>>> GetProductsByCategory(int? categoryId, ProductSort? sort, int? take, int? skip)
	{
		if (categoryId == null) return NotFound();
		List<ProductDto>? products = await productService.GetProductsByCategoryId(categoryId, sort, take, skip);
		return Ok(products);
	}
}