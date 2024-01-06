using Volga.Infrastructure.Data.Models;
using Volga.Infrastructure.Dtos;

namespace Volga.Infrastructure.EntityDtoMappers;

public static class CategoryDtoMapper
{
	/*
	 * Convert Category Entity Object to CategoryDto
	 */
	public static CategoryDto CategoryToDto(Category category, IEnumerable<Category>? ChildCategories = null, CategoryDto? ParentCategory = null, ICollection<ProductDto>? Products = null)
	{
		CategoryDto categoryDto = new CategoryDto()
		{
			Id = category.Id,
			parentId = category.parentId,
			Name = category.Name,
			Description = category.Description,
			ImgUrl = category.ImgUrl,
			ParentCategory = ParentCategory,
			Products = Products
		};

		if (ChildCategories is not null)
		{
			categoryDto.ChildCategories = CategoryListToDto(ChildCategories);
		}

		return categoryDto;
	}

	/*
	 * Convert List of Category Entity Objects to List of CategoryDto objects
	 */
	public static List<CategoryDto> CategoryListToDto(IEnumerable<Category> categories)
	{
		List<CategoryDto> result = new List<CategoryDto>();
		if (categories is null || categories.Count() == 0) return result;

		foreach (var category in categories)
		{
			var dtoItem = new CategoryDto()
			{
				Id = category.Id,
				parentId = category.parentId,
				Name = category.Name,
				Description = category.Description,
				ImgUrl = category.ImgUrl,
			};
			if (category.ChildCategories is not null)
			{
				dtoItem.ChildCategories = CategoryListToDto(category.ChildCategories);
			}
			if (category.ParentCategory is not null)
			{
				dtoItem.ParentCategory = CategoryToDto(category.ParentCategory);
			}

			result.Add(dtoItem);
		}
		return result;
	}
}
