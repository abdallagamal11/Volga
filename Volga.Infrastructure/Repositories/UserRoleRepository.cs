using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Repositories;

public class UserRoleRepository:BaseRepository<VgUserRole>
{
	public UserRoleRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}