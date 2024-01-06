using Volga.Infrastructure.Data;
using Volga.Infrastructure.Data.Models;
using Volga.Infrastructure.Interfaces;

namespace Volga.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
	public CategoryRepository(VgContext _context) : base(_context)
	{
		context = _context;
	}

	public async Task<IEnumerable<Category>> GetParentCategoriesAsync()
	{
		return await FindAllAsync(c => c.parentId == null);
	}

	public async Task<IEnumerable<Category>> GetChildrenByParentIdAsync(int parentId)
	{
		return await FindAllAsync(c => c.parentId == parentId);
	}
}