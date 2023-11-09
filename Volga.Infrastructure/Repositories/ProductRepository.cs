using Volga.Infrastructure.Models;
namespace Volga.Infrastructure.Repositories;

public class ProductRepository:BaseRepository<Product>
{
	public ProductRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}