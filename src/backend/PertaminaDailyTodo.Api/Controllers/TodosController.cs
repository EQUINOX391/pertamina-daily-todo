using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PertaminaDailyTodo.Api.Contracts.Todos;
using PertaminaDailyTodo.Api.Services;

namespace PertaminaDailyTodo.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        if (!TryGetAuthenticatedUserId(out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid authentication token."
            });
        }

        var todos = await _todoService.GetAllAsync(userId, cancellationToken);

        return Ok(todos);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        if (!TryGetAuthenticatedUserId(out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid authentication token."
            });
        }

        var todo = await _todoService.GetByIdAsync(
            userId,
            id,
            cancellationToken);

        if (todo is null)
        {
            return NotFound(new
            {
                message = "Todo was not found."
            });
        }

        return Ok(todo);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
    CreateTodoRequest request,
    CancellationToken cancellationToken)
    {
        if (!TryGetAuthenticatedUserId(out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid authentication token."
            });
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest(new
            {
                message = "Todo title is required."
            });
        }

        var todo = await _todoService.CreateAsync(
            userId,
            request,
            cancellationToken);

        if (todo is null)
        {
            return BadRequest(new
            {
                message = "Todo title is required."
            });
        }

        return CreatedAtAction(
            nameof(GetById),
            new { id = todo.Id },
            todo);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
    Guid id,
    UpdateTodoRequest request,
    CancellationToken cancellationToken)
    {
        if (!TryGetAuthenticatedUserId(out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid authentication token."
            });
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest(new
            {
                message = "Todo title is required."
            });
        }

        var todo = await _todoService.UpdateAsync(
            userId,
            id,
            request,
            cancellationToken);

        if (todo is null)
        {
            return NotFound(new
            {
                message = "Todo was not found."
            });
        }

        return Ok(todo);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        if (!TryGetAuthenticatedUserId(out var userId))
        {
            return Unauthorized(new
            {
                message = "Invalid authentication token."
            });
        }

        var deleted = await _todoService.DeleteAsync(
            userId,
            id,
            cancellationToken);

        if (!deleted)
        {
            return NotFound(new
            {
                message = "Todo was not found."
            });
        }

        return NoContent();
    }

    private bool TryGetAuthenticatedUserId(out Guid userId)
    {
        userId = Guid.Empty;

        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        return Guid.TryParse(userIdValue, out userId);
    }
}
