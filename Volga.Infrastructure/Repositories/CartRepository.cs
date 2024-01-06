using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class CartRepository:BaseRepository<Cart>
{
	public CartRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}