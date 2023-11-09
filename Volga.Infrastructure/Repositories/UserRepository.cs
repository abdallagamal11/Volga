using Volga.Infrastructure.Models;
namespace Volga.Infrastructure.Repositories;

public class UserRepository:BaseRepository<User>
{
	public UserRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}