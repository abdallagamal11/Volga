using Microsoft.AspNetCore.Mvc;
using Volga.Core.Dtos;
using Volga.Core.Services;

namespace webapi.Controllers;

public class CategoryController : BaseAPIController
{
	CategoryService _categoryService;
	public CategoryController(CategoryService categoryService)
	{
		_categoryService = categoryService;
	}

	[HttpGet("all")]
	public IActionResult GetAll()
	{
		return Ok(_categoryService.GetAllCategories());
	}

	[HttpGet("{id}")]
	public IActionResult Get(int? id)
	{
		if (id == null) return NotFound();
		CategoryDto? categoryDto = _categoryService.GetCategoryById((int)id);
		if (categoryDto == null) return NotFound();
		return Ok(categoryDto);
	}

	[HttpGet("parentAll")]
	public IActionResult GetAllParent()
	{
		return Ok(_categoryService.GetParentCategories());
	}
}