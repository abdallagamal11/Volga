using Microsoft.EntityFrameworkCore;
using Volga.Core.Enums;
using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;
using Volga.Infrastructure.Dtos;
using Volga.Infrastructure.Dtos.ProductListing;
using Volga.Infrastructure.Repositories;

namespace Volga.Core.Services;

public class ProductService
{
	private ProductRepository _productRepository;
	private VgContext _context;
	public ProductService(ProductRepository productRepository, VgContext context)
	{
		this._productRepository = productRepository;
		_context = context;
	}

	public async Task<ProductListPageDto?> GetProductsByCategoryId(int? categoryId, ProductSort? sort = null, int? take = null, int? skip = null, ProductFilterDto? productFilter = null)
	{
		if (categoryId == null) return null;
		IQueryable<Product> queryable = _productRepository.GetAllRaw()
			.Where(p => p.CategoryId == categoryId)
			.Include(p => p.Vendor);

		//Dictionary<int, string> vendors = await queryable
		//.Select(p => new { Id = p.VendorId, Name = p.Vendor.Name })
		//.Distinct()
		//.ToDictionaryAsync(v => v.Id, v => v.Name);

		//if (includeOutOfStock == false) queryable = queryable.Where(p => p.Stock > 0);
		queryable = resolveProductsFilters(queryable, productFilter);
		if (sort != null) queryable = this.GetSortOrdered(queryable, sort);

		IQueryable<ProductDto> query = queryable.Select((p) => new ProductDto
		{
			Id = p.Id,
			Title = p.Title,
			ImageUrl = p.ImageUrl,
			Description = p.Description,
			Price = p.Price,
			Discount = p.Discount,
			Stock = p.Stock,
			VendorId = p.VendorId,
			VendorName = p.Vendor.Name,
			RatingCount = p.RatingCount,
			RatingSum = p.RatingSum,
			Views = p.Views,
			Sales = p.Sales
		});

		if (skip != null && skip > 0) query = query.Skip((int)skip);
		if (take != null && take > 0) query = query.Take((int)take);
		if (query == null) return null;


		var pagedDataDto = new ProductListPageDto()
		{
			Data = await query.ToListAsync(),
			Pagination = new PaginationDto()
			{
				totalRecords = queryable.Count()
			},
			//			Sellers = vendors
		};

		return pagedDataDto;
	}

	protected IQueryable<Product> GetSortOrdered(IQueryable<Product> queryable, ProductSort? sorting)
	{
		switch (sorting)
		{
			case ProductSort.Popularity:
				queryable = queryable.OrderByDescending(p => p.Views * .5f + p.Sales * 1f + p.RatingSum / (p.RatingCount == 0 ? 1 : p.RatingCount) * .7f);
				break;
			case ProductSort.Rating:
				queryable = queryable.OrderByDescending(p => p.RatingSum / (p.RatingCount == 0 ? 1 : p.RatingCount)).ThenByDescending(p => p.RatingCount);
				break;
			case ProductSort.PriceLowToHigh:
				queryable = queryable.OrderBy(p => p.Price - (p.Discount / 100 * p.Price));
				break;
			case ProductSort.PriceHighToLow:
				queryable = queryable.OrderByDescending(p => p.Price - (p.Discount / 100 * p.Price));
				break;
			default:
				queryable = queryable.OrderBy(p => p.Id);
				break;
		}

		return queryable;
	}

	public ProductDto? GetProductById(int? id)
	{
		if (id == null) return null;
		Product? data = _productRepository.Find(p => p.Id == id, new string[] { "UserReviews", "Vendor" });

		if (data == null) return null;

		ProductDto productDto = new ProductDto()
		{
			Id = data.Id,
			CategoryId = data.CategoryId,
			Title = data.Title,
			ImageUrl = data.ImageUrl,
			Description = data.Description,
			Price = data.Price,
			Discount = data.Discount,
			Stock = data.Stock,
			VendorId = data.VendorId,
			VendorName = data.Vendor.Name,
			RatingCount = data.RatingCount,
			RatingSum = data.RatingSum,
		};
		return productDto;
	}

	public async Task<List<ProductDto>?> GetRecommendedProductsAsync(int take = 0, int categoryId = 0)
	{
		List<ProductDto>? productList;
		IQueryable<ProductDto> query = _productRepository
			.GetAllRaw()
			.Include(p => p.Vendor)
			.Select(p => new ProductDto()
			{
				Id = p.Id,
				CategoryId = p.CategoryId,
				Title = p.Title,
				ImageUrl = p.ImageUrl,
				Description = p.Description,
				Price = p.Price,
				Discount = p.Discount,
				Stock = p.Stock,
				VendorId = p.VendorId,
				VendorName = p.Vendor.Name,
				RatingCount = p.RatingCount,
				RatingSum = p.RatingSum,
				Views = p.Views,
				Sales = p.Sales
			})
			.Where(p => p.Stock > 0);
		if (categoryId > 0) query = query.Where(p => p.CategoryId == categoryId);
		query = query.OrderByDescending(p => (p.RatingCount * p.RatingSum) * .7 + p.Views * .5 + p.Sales);
		if (take > 0) query = query.Take(take);

		productList = await query.ToListAsync();
		return productList;
	}

	public IQueryable<Product> resolveProductsFilters(IQueryable<Product> products, ProductFilterDto? productFilter)
	{
		if (productFilter == null) return products.Where(p => p.Stock > 0);

		if (productFilter.Discount is not null)
		{
			if (productFilter.Discount.ShowOnlyDiscountedItems) products = products.Where(p => p.Discount > 0);
		}

		if (productFilter.Price is not null)
		{
			if (productFilter.Price.Start >= 0)
				products = products.Where(p => (p.Price - p.Discount * p.Price / 100) >= productFilter.Price.Start);

			if (productFilter.Price.End > 0)
				products = products.Where(p => (p.Price - p.Discount * p.Price / 100) <= productFilter.Price.End);
		}

		if (productFilter.Rating is not null)
		{
			if (productFilter.Rating.ShowWithRating <= 5 && productFilter.Rating.ShowWithRating >= 0)
			{
				products = products.Where(p => (p.RatingCount == 0 ? 0 : p.RatingSum / p.RatingCount) >= productFilter.Rating.ShowWithRating);
			}
		}

		if (productFilter.Seller is not null && productFilter.Seller.Sellers.Count() > 0)
		{
			products = products.Where(p => productFilter.Seller.Sellers.Contains(p.VendorId));
		}

		if (!(productFilter.Stock is not null && productFilter.Stock.IncludeOutOfStock == true))
		{
			products = products.Where(p => p.Stock > 0);
		}

		return products;
	}
}