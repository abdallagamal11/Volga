using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class OrderLineRepository : BaseRepository<OrderLine>
{
	public OrderLineRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}