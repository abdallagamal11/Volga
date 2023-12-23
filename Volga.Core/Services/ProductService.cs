using Microsoft.EntityFrameworkCore;
using Volga.Core.Dtos;
using Volga.Infrastructure;
using Volga.Infrastructure.Interfaces;
using Volga.Infrastructure.Models;

namespace Volga.Core.Services;

public class ProductService
{
	private IRepository<Product> _productRepository;
	private VgContext _context;
	public ProductService(IRepository<Product> productRepository, VgContext context)
	{
		this._productRepository = productRepository;
		_context = context;
	}

	public ProductDto? GetProductById(int? id)
	{
		if (id == null) return null;
		Product? data = _productRepository.Find(p => p.Id == id, new string[] { "UserReviews", "Vendor" });
		//		_productRepository.GetById((int)id);
		if (data == null) return null;

		int ratingCount = data.UserReviews.Count();
		int ratingSum = data.UserReviews.Sum(w => w.Rating);
		float rating = ratingCount > 0f ? (float)ratingSum / ratingCount : 0f;

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
			rating = rating,
		};
		return productDto;
	}

	public List<ProductDto>? GetRecommendedProducts(int take = 0, int categoryId = 0)
	{
		//CategorySeeder categorySeeder = new CategorySeeder(_context);
		//categorySeeder.Seed(10);

		//VendorSeeder vendorSeeder = new VendorSeeder(_context);
		//vendorSeeder.Seed(10);

		//		ProductSeeder productSeeder = new ProductSeeder(_context);
		//		productSeeder.Seed(20);

		List<ProductDto>? productList;
		var query = _productRepository.GetAllRaw().Include(p => p.UserReviews).Include(p => p.Vendor)
		.AsEnumerable().Select(p =>
		{
			int ratingCount = p.UserReviews.Count();
			int ratingSum = p.UserReviews.Sum(w => w.Rating);
			float rating = ratingCount > 0f ? (float)ratingSum / ratingCount : 0f;
			return new ProductDto()
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
				ratingCount = ratingCount,
				ratingSum = ratingSum,
				rating = rating,
			};
		});
		if (categoryId > 0) query = query.Where(p => p.CategoryId == categoryId);
		query = query.OrderByDescending(p => p.ratingCount).ThenByDescending(p => p.rating);

		productList = (take == 0 ? query.ToList() : query.Take(take).ToList());
		return productList;
	}
}