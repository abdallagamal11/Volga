using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Volga.Infrastructure.Data;
using Volga.Infrastructure.Interfaces;

namespace Volga.Infrastructure.Repositories;

public class BaseRepository<T> : IRepository<T> where T : class
{
	protected VgContext context;

	public BaseRepository(VgContext _context)
	{
		context = _context;
	}

	// GET ALL
	public List<T> GetAll()
	{
		return context.Set<T>().AsNoTracking().ToList();
	}
	public async Task<IEnumerable<T>> GetAllAsync()
	{
		return await context.Set<T>().AsNoTracking().ToListAsync();
	}

	// GET BY ID
	public T? GetById(int id)
	{
		return context.Set<T>().Find(id);
	}
	public async Task<T?> GetByIdAsync(int id)
	{
		return await context.Set<T>().FindAsync(id);
	}

	// FIND BY CRITERIA
	public T? Find(Expression<Func<T, bool>> criteria, string[]? includes)
	{
		IQueryable<T> query = context.Set<T>().AsNoTracking();

		if (includes != null)
			foreach (var include in includes)
				query = query.Include(include);

		return query.SingleOrDefault(criteria);
	}

	public async Task<T?> FindAsync(Expression<Func<T, bool>> criteria, string[]? includes = null)
	{
		IQueryable<T> query = context.Set<T>().AsNoTracking();

		if (includes != null)
			foreach (var include in includes)
				query = query.Include(include);

		return await query.SingleOrDefaultAsync(criteria);
	}

	// FIND ALL BY CRITERIA
	public IEnumerable<T> FindAll(Expression<Func<T, bool>> criteria, string[]? includes = null)
	{
		IQueryable<T> query = context.Set<T>().AsNoTracking();
		if (includes != null)
			foreach (var include in includes)
				query.Include(include);
		return query.Where(criteria).ToList();
	}

	public async Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> criteria)
	{
		IQueryable<T> query = context.Set<T>().AsNoTracking();

		return await query.Where(criteria).ToListAsync();
	}

	// ADD
	public T Add(T entity)
	{
		context.Set<T>().Add(entity);
		return entity;
	}

	public async Task<T> AddAsync(T entity)
	{
		await context.Set<T>().AddAsync(entity);
		return entity;
	}

	// ADD RANGE
	public IEnumerable<T> AddRange(IEnumerable<T> entities)
	{
		context.Set<T>().AddRangeAsync(entities);
		return entities;
	}
	public async Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities)
	{
		await context.Set<T>().AddRangeAsync(entities);
		return entities;
	}

	// UPDATE
	public T Update(T entity)
	{
		context.Update(entity);
		return entity;
	}

	public IEnumerable<T> UpdateRange(IEnumerable<T> entities)
	{
		context.UpdateRange(entities);
		return entities;
	}

	// DELETE
	public void Delete(T entity)
	{
		context.Set<T>().Remove(entity);
	}

	public void DeleteRange(IEnumerable<T> entities)
	{
		context.Set<T>().RemoveRange(entities);
	}

	// COUNT
	public int Count()
	{
		return context.Set<T>().Count();
	}

	public int Count(Expression<Func<T, bool>> criteria)
	{
		return context.Set<T>().Count(criteria);
	}

	public DbSet<T> GetAllRaw()
	{
		return context.Set<T>();
	}
}