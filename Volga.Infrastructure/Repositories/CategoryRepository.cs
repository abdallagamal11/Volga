using Volga.Infrastructure.Models;
namespace Volga.Infrastructure.Repositories;

public class CategoryRepository:BaseRepository<Category>
{
	public CategoryRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}