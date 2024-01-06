using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class ProductRepository : BaseRepository<Product>
{
	public ProductRepository(VgContext _context) : base(_context)
	{
		context = _context;
	}
}