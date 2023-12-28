using Microsoft.EntityFrameworkCore;
using Volga.Core.Dtos;
using Volga.Core.Enums;
using Volga.Infrastructure;
using Volga.Infrastructure.Models;
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

	public async Task<List<ProductDto>?> GetProductsByCategoryId(int? categoryId, ProductSort? sort = null, int? take = null, int? skip = null)
	{
		if (categoryId == null) return null;
		IQueryable<Product> queryable = _productRepository.GetAllRaw()
			.Where(p => p.CategoryId == categoryId)
			.Include(p => p.Vendor);

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
			ratingCount = p.ratingCount,
			ratingSum = p.ratingSum,
			Views = p.Views,
			Sales = p.Sales
		});

		if (skip != null) query = query.Skip((int)skip);
		if (take != null) query = query.Take((int)take);
		if (query == null) return null;

		return await query.ToListAsync();
	}

	protected IQueryable<Product> GetSortOrdered(IQueryable<Product> queryable, ProductSort? sorting)
	{
		switch (sorting)
		{
			case ProductSort.Popularity:
				queryable = queryable.OrderByDescending(p => p.Views * .5f + p.Sales * 1f);
				break;
			case ProductSort.Rating:
				queryable = queryable.OrderByDescending(p => p.ratingSum / (p.ratingCount == 0 ? 1 : p.ratingCount)).ThenByDescending(p => p.ratingCount);
				break;
			case ProductSort.PriceLowToHigh:
				queryable = queryable.OrderBy(p => p.Price * (p.Discount == 0 ? 1 : p.Discount / 100));
				break;
			case ProductSort.PriceHighToLow:
				queryable = queryable.OrderByDescending(p => p.Price * (p.Discount == 0 ? 1 : p.Discount / 100));
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

		int ratingCount = data.UserReviews.Count();
		int ratingSum = data.UserReviews.Sum(w => w.Rating);

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
			ratingCount = ratingCount,
			ratingSum = ratingSum,
		};
		return productDto;
	}

	public async Task<List<ProductDto>?> GetRecommendedProductsAsync(int take = 0, int categoryId = 0)
	{
		//CategorySeeder categorySeeder = new CategorySeeder(_context);
		//categorySeeder.Seed(10);

		//VendorSeeder vendorSeeder = new VendorSeeder(_context);
		//vendorSeeder.Seed(10);

		//ProductSeeder productSeeder = new ProductSeeder(_context);
		//productSeeder.Seed(20);

		//UserReviewSeeder reviewsSeeder = new UserReviewSeeder(_context);
		//reviewsSeeder.Seed(10);

		//	GetProductsByCategoryId(10);
		List<ProductDto>? productList;
		IQueryable<ProductDto> query = _productRepository
			.GetAllRaw()
			.Include(p => p.UserReviews)
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
				ratingCount = p.UserReviews.Count(),
				ratingSum = p.UserReviews.Sum(w => w.Rating),
			});
		if (categoryId > 0) query = query.Where(p => p.CategoryId == categoryId);
		query = query.OrderByDescending(p => p.ratingCount * p.ratingSum);
		if (take > 0) query = query.Take(take);

		productList = await query.ToListAsync();
		return productList;
	}
}