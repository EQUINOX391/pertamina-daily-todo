using Microsoft.EntityFrameworkCore;
using PertaminaDailyTodo.Api.Contracts.Todos;
using PertaminaDailyTodo.Api.Data;
using PertaminaDailyTodo.Api.Entities;

namespace PertaminaDailyTodo.Api.Services;

public class TodoService : ITodoService
{
    private readonly AppDbContext _dbContext;

    public TodoService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<TodoResponse>> GetAllAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.TodoItems
            .AsNoTracking()
            .Where(todoItem => todoItem.UserId == userId)
            .OrderByDescending(todoItem => todoItem.CreatedAtUtc)
            .Select(todoItem => ToResponse(todoItem))
            .ToListAsync(cancellationToken);
    }

    public async Task<TodoResponse?> GetByIdAsync(
        Guid userId,
        Guid todoId,
        CancellationToken cancellationToken = default)
    {
        var todoItem = await _dbContext.TodoItems
            .AsNoTracking()
            .FirstOrDefaultAsync(
                todoItem => todoItem.Id == todoId && todoItem.UserId == userId,
                cancellationToken);

        if (todoItem is null)
        {
            return null;
        }

        return ToResponse(todoItem);
    }

    public async Task<TodoResponse> CreateAsync(
        Guid userId,
        CreateTodoRequest request,
        CancellationToken cancellationToken = default)
    {
        var todoItem = new TodoItem
        {
            UserId = userId,
            Title = request.Title.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description)
                ? null
                : request.Description.Trim(),
            DueDateUtc = request.DueDateUtc,
            IsCompleted = false,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.TodoItems.Add(todoItem);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return ToResponse(todoItem);
    }

    public async Task<TodoResponse?> UpdateAsync(
        Guid userId,
        Guid todoId,
        UpdateTodoRequest request,
        CancellationToken cancellationToken = default)
    {
        var todoItem = await _dbContext.TodoItems
            .FirstOrDefaultAsync(
                todoItem => todoItem.Id == todoId && todoItem.UserId == userId,
                cancellationToken);

        if (todoItem is null)
        {
            return null;
        }

        todoItem.Title = request.Title.Trim();
        todoItem.Description = string.IsNullOrWhiteSpace(request.Description)
            ? null
            : request.Description.Trim();
        todoItem.IsCompleted = request.IsCompleted;
        todoItem.DueDateUtc = request.DueDateUtc;
        todoItem.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return ToResponse(todoItem);
    }

    public async Task<bool> DeleteAsync(
        Guid userId,
        Guid todoId,
        CancellationToken cancellationToken = default)
    {
        var todoItem = await _dbContext.TodoItems
            .FirstOrDefaultAsync(
                todoItem => todoItem.Id == todoId && todoItem.UserId == userId,
                cancellationToken);

        if (todoItem is null)
        {
            return false;
        }

        _dbContext.TodoItems.Remove(todoItem);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static TodoResponse ToResponse(TodoItem todoItem)
    {
        return new TodoResponse
        {
            Id = todoItem.Id,
            Title = todoItem.Title,
            Description = todoItem.Description,
            IsCompleted = todoItem.IsCompleted,
            DueDateUtc = todoItem.DueDateUtc,
            CreatedAtUtc = todoItem.CreatedAtUtc,
            UpdatedAtUtc = todoItem.UpdatedAtUtc
        };
    }
}
