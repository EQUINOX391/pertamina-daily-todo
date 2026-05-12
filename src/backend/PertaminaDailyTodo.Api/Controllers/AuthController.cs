using Microsoft.AspNetCore.Mvc;
using PertaminaDailyTodo.Api.Contracts.Auth;
using PertaminaDailyTodo.Api.Services;

namespace PertaminaDailyTodo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _authService.RegisterAsync(request, cancellationToken);

        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                message = result.Error
            });
        }

        return StatusCode(StatusCodes.Status201Created, result.Data);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(request, cancellationToken);

        if (!result.Succeeded)
        {
            return Unauthorized(new
            {
                message = result.Error
            });
        }

        return Ok(result.Data);
    }
}
