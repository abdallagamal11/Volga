using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("/api/[controller]")]
public abstract class BaseAPIController : ControllerBase
{
}