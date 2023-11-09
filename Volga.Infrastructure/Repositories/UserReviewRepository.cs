using Volga.Infrastructure.Models;
namespace Volga.Infrastructure.Repositories;

public class UserReviewRepository:BaseRepository<UserReview>
{
	public UserReviewRepository(VgContext _context):base(_context)
	{
		context = _context;
	}
}