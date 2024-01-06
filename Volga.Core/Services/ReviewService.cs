using Volga.Infrastructure.Data.Models;
using Volga.Infrastructure.Interfaces;

namespace Volga.Core.Services;

public class ReviewService
{
	private readonly IRepository<UserReview> _reviewRepository;

	public ReviewService(IRepository<UserReview> repository)
	{
		_reviewRepository = repository;
	}

	public IList<UserReview> GetPagedReviewsByProductId(int productId)
	{
		return _reviewRepository.GetAllRaw()
		.Where(r => r.ProductId == productId).ToList();

	}
}
