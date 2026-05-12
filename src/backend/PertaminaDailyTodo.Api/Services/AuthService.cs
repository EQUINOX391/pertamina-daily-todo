using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PertaminaDailyTodo.Api.Common.Options;
using PertaminaDailyTodo.Api.Contracts.Auth;
using PertaminaDailyTodo.Api.Data;
using PertaminaDailyTodo.Api.Entities;

namespace PertaminaDailyTodo.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly JwtOptions _jwtOptions;

    public AuthService(
        AppDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IOptions<JwtOptions> jwtOptions)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtOptions = jwtOptions.Value;
    }

    public async Task<AuthResult> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailAlreadyExists = await _dbContext.Users
            .AnyAsync(user => user.Email == normalizedEmail, cancellationToken);

        if (emailAlreadyExists)
        {
            return AuthResult.Failure("Email is already registered.");
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Email = normalizedEmail
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var response = CreateAuthResponse(user);

        return AuthResult.Success(response);
    }

    public async Task<AuthResult> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Email == normalizedEmail, cancellationToken);

        if (user is null)
        {
            return AuthResult.Failure("Invalid email or password.");
        }

        var verificationResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password);

        if (verificationResult == PasswordVerificationResult.Failed)
        {
            return AuthResult.Failure("Invalid email or password.");
        }

        if (verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        var response = CreateAuthResponse(user);

        return AuthResult.Success(response);
    }

    private AuthResponse CreateAuthResponse(User user)
    {
        if (string.IsNullOrWhiteSpace(_jwtOptions.Key))
        {
            throw new InvalidOperationException("JWT key is not configured.");
        }

        var expiresAtUtc = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpiresInMinutes);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.FullName)
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            expires: expiresAtUtc,
            signingCredentials: credentials);

        return new AuthResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAtUtc = expiresAtUtc,
            User = new UserResponse
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            }
        };
    }
}
