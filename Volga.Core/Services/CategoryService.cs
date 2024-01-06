using Volga.Infrastructure;
using Volga.Infrastructure.Data.Models;
using Volga.Infrastructure.Dtos;
using Volga.Infrastructure.EntityDtoMappers;
using Volga.Infrastructure.Interfaces;

namespace Volga.Core.Services;

public class CategoryService
{
	ICategoryRepository _categoryRepository;
	private readonly IUnitOfWork _unitOfWork;

	public CategoryService(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
		_categoryRepository = _unitOfWork.CategoryRepository;
	}

	/*
	 * List all
	 */
	public async Task<List<CategoryDto>> GetAllCategoriesAsync()
	{
		return CategoryDtoMapper.CategoryListToDto(await _categoryRepository.GetAllAsync());
	}

	public async Task<IEnumerable<CategoryDto>?> GetParentCategoriesAsync()
	{
		return CategoryDtoMapper.CategoryListToDto(await _categoryRepository.GetParentCategoriesAsync());
	}

	public async Task<List<CategoryDto>?> GetChildCategoriesAsync(int parentId)
	{
		return CategoryDtoMapper.CategoryListToDto(await _categoryRepository.GetChildrenByParentIdAsync(parentId));
	}

	public async Task<CategoryDto?> GetCategoryByIdAsync(int categoryId)
	{
		Category? category = await _categoryRepository.FindAsync(c => c.Id == categoryId);
		if (category == null) return null;

		return CategoryDtoMapper.CategoryToDto(category);
	}

	public async Task<CategoryDto?> GetCategoryByIdWithChildrenAsync(int categoryId)
	{
		Category? category = _categoryRepository.Find(c => c.Id == categoryId);
		if (category == null) return null;

		IEnumerable<Category>? children = await _categoryRepository.FindAllAsync(c => c.parentId == categoryId);

		return CategoryDtoMapper.CategoryToDto(category, ChildCategories: children);
	}


}