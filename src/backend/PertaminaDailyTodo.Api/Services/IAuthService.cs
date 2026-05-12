using PertaminaDailyTodo.Api.Contracts.Auth;

namespace PertaminaDailyTodo.Api.Services;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);

    Task<AuthResult> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
}
