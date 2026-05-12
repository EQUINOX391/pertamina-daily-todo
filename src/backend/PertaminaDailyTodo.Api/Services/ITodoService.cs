using PertaminaDailyTodo.Api.Contracts.Todos;

namespace PertaminaDailyTodo.Api.Services;

public interface ITodoService
{
    Task<List<TodoResponse>> GetAllAsync(
        Guid userId,
        CancellationToken cancellationToken = default);

    Task<TodoResponse?> GetByIdAsync(
        Guid userId,
        Guid todoId,
        CancellationToken cancellationToken = default);

    Task<TodoResponse> CreateAsync(
        Guid userId,
        CreateTodoRequest request,
        CancellationToken cancellationToken = default);

    Task<TodoResponse?> UpdateAsync(
        Guid userId,
        Guid todoId,
        UpdateTodoRequest request,
        CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(
        Guid userId,
        Guid todoId,
        CancellationToken cancellationToken = default);
}
