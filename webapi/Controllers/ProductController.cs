using Microsoft.AspNetCore.Mvc;
using Volga.Core.Enums;
using Volga.Core.Services;
using Volga.Infrastructure.Dtos;
using Volga.Infrastructure.Dtos.ProductListing;

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
		return data == null ? NotFound() : Ok(data);
	}

	[HttpGet("recommended")]
	public async Task<IActionResult> GetRecommendedProducts(int take = 0, int categoryId = 0)
	{
		if (take == 0 || take > 50) take = 50;
		return Ok(await productService.GetRecommendedProductsAsync(take, categoryId));
	}

	[HttpPost("bycategory/{categoryId}")]
	public async Task<ActionResult<ProductListPageDto>> GetProductsByCategory(int? categoryId, ProductSort? sort, int? take, int? skip, ProductFilterDto? filters)
	{
		if (categoryId == null) return BadRequest();
		ProductListPageDto? products = await productService.GetProductsByCategoryId(categoryId, sort, take, skip, filters);
		return Ok(products);
	}
}