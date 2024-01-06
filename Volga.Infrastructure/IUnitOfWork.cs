using Volga.Infrastructure.Data;
using Volga.Infrastructure.Interfaces;

namespace Volga.Infrastructure;

public interface IUnitOfWork
{
	VgContext _context { get; }
	ICategoryRepository CategoryRepository { get; }

	void Save();
	Task SaveAsync();
}