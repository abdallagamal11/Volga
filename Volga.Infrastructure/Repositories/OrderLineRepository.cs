using Volga.Infrastructure.Models;
namespace Volga.Infrastructure.Repositories;

public class OrderLineRepository : BaseRepository<OrderLine>
{
	public OrderLineRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}