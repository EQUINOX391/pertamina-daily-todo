using Microsoft.EntityFrameworkCore;
using PertaminaDailyTodo.Api.Entities;

namespace PertaminaDailyTodo.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");

            entity.HasKey(user => user.Id);

            entity.Property(user => user.FullName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(user => user.Email)
                .HasMaxLength(255)
                .IsRequired();

            entity.HasIndex(user => user.Email)
                .IsUnique();

            entity.Property(user => user.PasswordHash)
                .HasMaxLength(500)
                .IsRequired();

            entity.Property(user => user.CreatedAtUtc)
                .HasDefaultValueSql("SYSUTCDATETIME()");
        });

        modelBuilder.Entity<TodoItem>(entity =>
        {
            entity.ToTable("TodoItems");

            entity.HasKey(todoItem => todoItem.Id);

            entity.Property(todoItem => todoItem.Title)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(todoItem => todoItem.Description)
                .HasMaxLength(1000);

            entity.Property(todoItem => todoItem.IsCompleted)
                .HasDefaultValue(false);

            entity.Property(todoItem => todoItem.CreatedAtUtc)
                .HasDefaultValueSql("SYSUTCDATETIME()");

            entity.HasOne(todoItem => todoItem.User)
                .WithMany(user => user.TodoItems)
                .HasForeignKey(todoItem => todoItem.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
