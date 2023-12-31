using Bogus;
using Microsoft.EntityFrameworkCore;
using Volga.Infrastructure;
using Volga.Infrastructure.Models;

namespace Volga.Core;

public class Seeders
{
}

public class VendorSeeder
{
	private readonly VgContext _context;
	private readonly Faker<Vendor> _faker;

	public VendorSeeder(VgContext context)
	{
		_context = context;

		_faker = new Faker<Vendor>()
			.RuleFor(v => v.Name, f => f.Company.CompanyName())
			.RuleFor(v => v.Description, f => f.Lorem.Paragraph())
			.RuleFor(v => v.UserId, f => f.Random.Number(1, 100)); // Adjust the range as needed
	}

	public void Seed(int count)
	{
		var vendors = _faker.Generate(count);

		foreach (var vendor in vendors)
		{
			// Set UserId within the range of existing VgUser entities
			var userId = _context.Users.OrderBy(u => Guid.NewGuid()).Select(u => u.Id).FirstOrDefault();
			vendor.UserId = userId;

			_context.Vendors.Add(vendor);
		}

		_context.SaveChanges();
	}
}

public class ProductSeeder
{
	private readonly VgContext _context;
	private readonly Faker<Product> _faker;

	public ProductSeeder(VgContext context)
	{
		_context = context;

		int[]? randomCategory = _context.Categories.Select(x => x.Id).ToArray();
		int[]? randomVendor = _context.Vendors.Select(x => x.Id).ToArray();

		var test = ";";

		_faker = new Faker<Product>()
			.RuleFor(p => p.CategoryId, f => f.PickRandom(randomCategory)) // Adjust the range as needed
			.RuleFor(p => p.Title, f => f.Commerce.ProductName())
			.RuleFor(p => p.ImageUrl, f => GetValidImageUrl(f))
			.RuleFor(p => p.Description, f => f.Lorem.Paragraph())
			.RuleFor(p => p.Stock, f => f.Random.Number(10, 100))
			.RuleFor(p => p.Price, f => f.Random.Double(10, 1000)) // Adjust the range as needed
			.RuleFor(p => p.Discount, f => f.Random.Number(0, 0)) // Adjust the range as needed//f.Random.Double(0, 50)
			.RuleFor(p => p.VendorId, f => f.PickRandom(randomVendor));
	}

	private string GetValidImageUrl(Faker faker)
	{
		var imageUrl = faker.Image.PicsumUrl();

		// Check if the image URL is reachable
		if (!IsImageUrlValid(imageUrl).GetAwaiter().GetResult())
		{
			// If not, generate a new one
			imageUrl = faker.Image.PicsumUrl();
		}

		return imageUrl;
	}

	private async Task<bool> IsImageUrlValid(string url)
	{
		try
		{
			using (var httpClient = new HttpClient())
			{
				var response = await httpClient.GetAsync(url);
				return response.IsSuccessStatusCode;
			}
		}
		catch (Exception)
		{
			// Handle exceptions (e.g., network issues)
			return false;
		}
	}

	public void Seed(int count)
	{
		var products = _faker.Generate(count);

		foreach (var product in products)
		{
			// Optionally, you can set other properties or perform additional logic before adding to the context
			// e.g., product.SomeProperty = someValue;

			_context.Products.Add(product);
		}

		_context.SaveChanges();
	}
}

public class CategorySeeder
{
	private readonly VgContext _context;
	private readonly Faker<Category> _faker;

	public CategorySeeder(VgContext context)
	{
		_context = context;

		_faker = new Faker<Category>()
			.RuleFor(c => c.parentId, f => null) // Adjust the range as needed
			.RuleFor(c => c.Name, f => f.Commerce.Categories(1)[0])
			.RuleFor(c => c.Description, f => f.Lorem.Paragraph());
	}

	public void Seed(int count)
	{
		var categories = _faker.Generate(count);

		foreach (var category in categories)
		{
			// Optionally, you can set other properties or perform additional logic before adding to the context
			// e.g., category.SomeProperty = someValue;

			_context.Categories.Add(category);
		}

		_context.SaveChanges();
	}
}


// ===================================================================
// USER REVIEWS SEEDER
// ===================================================================
public class UserReviewSeeder
{
	private readonly VgContext _context;
	private readonly Faker<UserReview> _faker;

	public UserReviewSeeder(VgContext context)
	{
		_context = context;

		int[] randomUserIds = _context.Users.Select(x => x.Id).ToArray();
		int[] randomProductIds = _context.Products.Select(x => x.Id).ToArray();

		_faker = new Faker<UserReview>()
			.RuleFor(r => r.UserId, f => f.PickRandom(randomUserIds))
			.RuleFor(r => r.Comment, f => f.Lorem.Paragraph())
			.RuleFor(r => r.Rating, f => f.Random.Int(1, 5))
			.RuleFor(r => r.ProductId, f => f.PickRandom(randomProductIds));
	}

	public void Seed(int count)
	{
		var reviews = _faker.Generate(count);

		foreach (var review in reviews)
		{
			// Optionally, you can set other properties or perform additional logic before adding to the context
			// e.g., review.SomeProperty = someValue;

			_context.UserReviews.Add(review);
		}

		_context.SaveChanges();
	}
}

/*PRODUCT */

public static class DatabaseSeeder
{

	public static void SeedProducts(VgContext dbContext)
	{
		if (!dbContext.Set<Product>().Any())
		{
			var productFaker = new Faker<Product>()
				.RuleFor(p => p.CategoryId, (f, p) => dbContext.Categories.OrderBy(v => Guid.NewGuid()).Select(v => v.Id).FirstOrDefault())
				.RuleFor(p => p.Title, f => f.Commerce.ProductName())
				.RuleFor(p => p.ImageUrl, f => f.Image.PicsumUrl())
				.RuleFor(p => p.Description, f => f.Lorem.Paragraph())
				.RuleFor(p => p.Price, f => f.Random.Double(10, 10000))
				.RuleFor(p => p.Discount, f => f.Random.Double(0, 20))
				.RuleFor(p => p.Stock, f => f.Random.Number(10, 100))
				.RuleFor(p => p.VendorId, (f, p) => dbContext.Vendors.OrderBy(v => Guid.NewGuid()).Select(v => v.Id).FirstOrDefault());

			var products = productFaker.Generate(100); // Generate 10 fake products

			dbContext.Set<Product>().AddRange(products);
			dbContext.SaveChanges();
		}
	}
	public static void SeedProductUserInteractions(VgContext dbContext)
	{
		var productUserInteractionFaker = new Faker<ProductUserInteraction>()
			.RuleFor(pui => pui.ProductId, (f, pui) => f.Random.Number(0, 10)) // Assuming you have 10 products
			.RuleFor(pui => pui.Views, f => f.Random.Number(0, 20))
			.RuleFor(pui => pui.Sales, f => f.Random.Number(0, 5))
			.RuleFor(pui => pui.UserId, f => null); // Assuming you have 5 users

		var usedKeys = new HashSet<(int, int)>(); // Track used keys


		var productUserInteractions = productUserInteractionFaker.Generate(100); // Generate 20 interactions

		foreach (var userInteraction in productUserInteractions)
		{
			var newKey = (productId: 0, userId: 0);

			do
			{
				newKey.productId = dbContext.Products.AsNoTracking().OrderBy(v => Guid.NewGuid()).Select(v => v.Id).FirstOrDefault();
				newKey.userId = dbContext.Users.AsNoTracking().OrderBy(v => Guid.NewGuid()).Select(v => v.Id).FirstOrDefault();
			} while (!usedKeys.Add(newKey));

			userInteraction.UserId = newKey.userId;
			userInteraction.ProductId = newKey.productId;

			if (dbContext.ProductUserInteractions.FirstOrDefault(pui => pui.ProductId == newKey.productId && pui.UserId == newKey.userId) != null)
			{
				continue;
			}

			dbContext.ProductUserInteractions.Add(userInteraction);
		}

		dbContext.SaveChanges();

	}
}
