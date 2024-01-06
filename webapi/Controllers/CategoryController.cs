using Microsoft.AspNetCore.Mvc;
using Volga.Core.Services;
using Volga.Infrastructure.Dtos;

namespace webapi.Controllers;

public class CategoryController : BaseAPIController
{
	CategoryService _categoryService;
	public CategoryController(CategoryService categoryService)
	{
		_categoryService = categoryService;
	}

	[HttpGet("all")]
	[ProducesResponseType(200)]
	public async Task<IActionResult> GetAll()
	{
		return Ok(await _categoryService.GetAllCategoriesAsync());
	}

	[HttpGet("{id}")]
	[ProducesResponseType(200)]
	[ProducesResponseType(404)]
	public async Task<IActionResult> Get(int id, bool includeSubcategories = false)
	{
		CategoryDto? categoryDto;
		if (!includeSubcategories)
			categoryDto = await _categoryService.GetCategoryByIdAsync(id);
		else
			categoryDto = await _categoryService.GetCategoryByIdWithChildrenAsync(id);

		if (categoryDto == null) return NotFound();
		return Ok(categoryDto);
	}

	[HttpGet("top-level")]
	[ProducesResponseType(200)]
	public async Task<IActionResult> GetAllParent()
	{
		return Ok(await _categoryService.GetParentCategoriesAsync());
	}

	[HttpGet("{id}/subcategories")]
	[ProducesResponseType(200)]
	public async Task<IActionResult> GetAllChildren(int id)
	{
		return Ok(await _categoryService.GetChildCategoriesAsync(id));
	}
}