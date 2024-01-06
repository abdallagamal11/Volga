using Volga.Infrastructure.Data;
using Volga.Infrastructure.Interfaces;
using Volga.Infrastructure.Repositories;

namespace Volga.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
	public VgContext _context { get; }
	private ICategoryRepository categoryRepository;

	public UnitOfWork(VgContext context)
	{
		_context = context;
	}

	public ICategoryRepository CategoryRepository
	{
		get
		{
			if (categoryRepository is null)
			{
				categoryRepository = new CategoryRepository(_context);
			}
			return categoryRepository;
		}
	}

	public void Save()
	{
		_context.SaveChanges();
	}

	public async Task SaveAsync()
	{
		await _context.SaveChangesAsync();
	}
}