using System.ComponentModel.DataAnnotations;

namespace PertaminaDailyTodo.Api.Contracts.Todos;

public class CreateTodoRequest
{
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    public DateTime? DueDateUtc { get; set; }
}
