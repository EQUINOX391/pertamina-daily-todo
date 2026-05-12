namespace PertaminaDailyTodo.Api.Contracts.Auth;

public class AuthResult
{
    public bool Succeeded { get; private set; }

    public string? Error { get; private set; }

    public AuthResponse? Data { get; private set; }

    public static AuthResult Success(AuthResponse data)
    {
        return new AuthResult
        {
            Succeeded = true,
            Data = data
        };
    }

    public static AuthResult Failure(string error)
    {
        return new AuthResult
        {
            Succeeded = false,
            Error = error
        };
    }
}
