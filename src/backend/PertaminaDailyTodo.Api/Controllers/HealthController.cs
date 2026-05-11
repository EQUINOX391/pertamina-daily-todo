using Microsoft.AspNetCore.Mvc;

namespace PertaminaDailyTodo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            service = "PertaminaDailyTodo.Api",
            timestampUtc = DateTime.UtcNow
        });
    }
}
