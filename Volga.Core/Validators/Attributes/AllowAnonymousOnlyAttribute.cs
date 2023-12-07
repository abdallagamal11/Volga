using Microsoft.AspNetCore.Mvc;
using Volga.Core.Validators.Filters;

namespace Volga.Core.Validators.Attributes;

public class AllowAnonymousOnlyAttribute : TypeFilterAttribute
{
	public AllowAnonymousOnlyAttribute()
	: base(typeof(AllowAnonymousOnlyActionFilter)) { }
}