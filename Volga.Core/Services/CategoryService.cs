using Microsoft.EntityFrameworkCore;
using Volga.Core.Dtos;
using Volga.Infrastructure.Interfaces;
using Volga.Infrastructure.Models;

namespace Volga.Core.Services;

public class CategoryService
{
	IRepository<Category> _categoryRepository;
	public CategoryService(IRepository<Category> categoryRepository)
	{
		_categoryRepository = categoryRepository;
	}

	public List<CategoryDto> GetAllCategories()
	{
		return _categoryRepository.GetAllRaw().Select(c => new CategoryDto()
		{
			Id = c.Id,
			parentId = c.parentId,
			Name = c.Name,
			Description = c.Description,
			ImgUrl = c.ImgUrl,
		}).AsNoTracking().ToList();
	}

	public List<CategoryDto>? GetParentCategories()
	{
		return _categoryRepository.GetAllRaw()
		.Where(c => c.parentId == null)
		.Select(c => new CategoryDto()
		{
			Id = c.Id,
			Name = c.Name,
			Description = c.Description,
			ImgUrl = c.ImgUrl,
		}).AsNoTracking().ToList();
	}

	public List<CategoryDto>? GetChildCategories(int parentId)
	{
		return _categoryRepository.GetAllRaw()
		.Where(c => c.parentId == parentId)
		.Select(c => new CategoryDto()
		{
			Id = c.Id,
			Name = c.Name,
			Description = c.Description,
			ImgUrl = c.ImgUrl,
		}).AsNoTracking().ToList();
	}

	public CategoryDto? GetCategoryById(int categoryId)
	{
		Category? category = _categoryRepository.Find(c => c.Id == categoryId);
		if (category == null) return null;

		return new CategoryDto()
		{
			Id = category.Id,
			parentId = category.parentId,
			Name = category.Name,
			Description = category.Description,
			ImgUrl = category.ImgUrl,
		};
	}
}