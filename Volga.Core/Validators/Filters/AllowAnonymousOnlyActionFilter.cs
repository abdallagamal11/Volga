using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Volga.Core.Validators.Filters;
class AllowAnonymousOnlyActionFilter : IAuthorizationFilter
{
	public void OnAuthorization(AuthorizationFilterContext context)
	{
		if (context.HttpContext.User.Identity != null && context.HttpContext.User.Identity.IsAuthenticated)
		{
			context.Result = new UnauthorizedResult();
		}
	}
}