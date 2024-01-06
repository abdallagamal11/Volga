using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class UserRepository:BaseRepository<VgUser>
{
	public UserRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}