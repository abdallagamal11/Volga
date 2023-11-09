using System.Linq.Expressions;

namespace Volga.Infrastructure.Interfaces;

interface IRepository<T> where T : class
{
	public T? GetById(int id);
	public Task<T?> GetByIdAsync(int id);

	public IEnumerable<T> GetAll();
	public Task<IEnumerable<T>> GetAllAsync();

	public T? Find(Expression<Func<T, bool>> criteria, string[]? includes = null);
	public Task<T?> FindAsync(Expression<Func<T, bool>> criteria, string[]? includes = null);

	public IEnumerable<T> FindAll(Expression<Func<T, bool>> criteria);
	public Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> criteria);

	public T Add(T entity);
	public Task<T> AddAsync(T entity);
	public IEnumerable<T> AddRange(IEnumerable<T> entities);
	public Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities);

	public T Update(T entity);
	public IEnumerable<T> UpdateRange(IEnumerable<T> entities);

	public void Delete(T entity);
	public void DeleteRange(IEnumerable<T> entities);

	//public Task<T> Attach(T entity);
	//public Task<IEnumerable<T>> AttachRange(IEnumerable<T> entities);
	public int Count(Expression<Func<T, bool>> criteria);
	public int Count();
}