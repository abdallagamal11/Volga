using Volga.Infrastructure.Data.Models;

namespace Volga.Infrastructure.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
	Task<IEnumerable<Category>> GetParentCategoriesAsync();
	Task<IEnumerable<Category>> GetChildrenByParentIdAsync(int parentId);
}