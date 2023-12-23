using Bogus;
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
			.RuleFor(p => p.Price, f => f.Random.Double(10, 1000)) // Adjust the range as needed
			.RuleFor(p => p.Discount, f => f.Random.Double(0, 50)) // Adjust the range as needed
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