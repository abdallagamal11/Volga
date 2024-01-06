using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class CartItemRepository:BaseRepository<CartItem>
{
	public CartItemRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}