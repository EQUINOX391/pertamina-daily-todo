import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../../api/todoApi";
import { removeAccessToken } from "../../../utils/tokenStorage";

const TODO_TITLE_MAX_LENGTH = 150;
const TODO_DESCRIPTION_MAX_LENGTH = 1000;

function TodoListPage() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingTodoId, setUpdatingTodoId] = useState(null);
  const [deletingTodoId, setDeletingTodoId] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [createErrorMessage, setCreateErrorMessage] = useState("");
  const [editErrorMessage, setEditErrorMessage] = useState("");

  const handleUnauthorized = useCallback(() => {
    removeAccessToken();
    navigate("/login", { replace: true });
  }, [navigate]);

  const loadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await getTodos();

      setTodos(result);
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      setErrorMessage("Failed to load TODO list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function validateTodoInput(titleValue, descriptionValue) {
    const title = titleValue.trim();
    const description = descriptionValue.trim();

    if (!title) {
      return "Todo title is required.";
    }

    if (title.length > TODO_TITLE_MAX_LENGTH) {
      return `Todo title must not exceed ${TODO_TITLE_MAX_LENGTH} characters.`;
    }

    if (description.length > TODO_DESCRIPTION_MAX_LENGTH) {
      return `Todo description must not exceed ${TODO_DESCRIPTION_MAX_LENGTH} characters.`;
    }

    return "";
  }

  function getErrorMessage(error, fallbackMessage) {
    const responseMessage = error.response?.data?.message;

    if (responseMessage) {
      return responseMessage;
    }

    const validationErrors = error.response?.data?.errors;

    if (validationErrors) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      return validationErrors[firstErrorKey][0];
    }

    return fallbackMessage;
  }

  function buildDueDateUtc(dateValue) {
    if (!dateValue) {
      return null;
    }

    return new Date(`${dateValue}T00:00:00.000Z`).toISOString();
  }

  function buildDateInputValue(dateValue) {
    if (!dateValue) {
      return "";
    }

    return new Date(dateValue).toISOString().slice(0, 10);
  }

  async function handleCreateSubmit(event) {
    event.preventDefault();

    setCreateErrorMessage("");

    const validationMessage = validateTodoInput(
      form.title,
      form.description
    );

    if (validationMessage) {
      setCreateErrorMessage(validationMessage);
      return;
    }

    try {
      setIsCreating(true);

      await createTodo({
        title: form.title.trim(),
        description: form.description.trim() || null,
        dueDateUtc: buildDueDateUtc(form.dueDate),
      });

      setForm({
        title: "",
        description: "",
        dueDate: "",
      });

      await loadTodos();
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      setCreateErrorMessage(
        getErrorMessage(error, "Failed to create TODO. Please try again.")
      );
    } finally {
      setIsCreating(false);
    }
  }

  function handleStartEdit(todo) {
    setEditingTodoId(todo.id);
    setEditErrorMessage("");
    setErrorMessage("");

    setEditForm({
      title: todo.title,
      description: todo.description || "",
      dueDate: buildDateInputValue(todo.dueDateUtc),
    });
  }

  function handleCancelEdit() {
    setEditingTodoId(null);
    setEditErrorMessage("");

    setEditForm({
      title: "",
      description: "",
      dueDate: "",
    });
  }

  async function handleEditSubmit(event, todo) {
    event.preventDefault();

    setEditErrorMessage("");

    const validationMessage = validateTodoInput(
      editForm.title,
      editForm.description
    );

    if (validationMessage) {
      setEditErrorMessage(validationMessage);
      return;
    }

    try {
      setUpdatingTodoId(todo.id);

      const updatedTodo = await updateTodo(todo.id, {
        title: editForm.title.trim(),
        description: editForm.description.trim() || null,
        isCompleted: todo.isCompleted,
        dueDateUtc: buildDueDateUtc(editForm.dueDate),
      });

      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) =>
          currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo
        )
      );

      handleCancelEdit();
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      setEditErrorMessage(
        getErrorMessage(error, "Failed to update TODO. Please try again.")
      );
    } finally {
      setUpdatingTodoId(null);
    }
  }

  async function handleToggleStatus(todo) {
    try {
      setUpdatingTodoId(todo.id);
      setErrorMessage("");

      const updatedTodo = await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        isCompleted: !todo.isCompleted,
        dueDateUtc: todo.dueDateUtc,
      });

      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) =>
          currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo
        )
      );
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      setErrorMessage(
        getErrorMessage(error, "Failed to update TODO status. Please try again.")
      );
    } finally {
      setUpdatingTodoId(null);
    }
  }

  async function handleDeleteTodo(todo) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${todo.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingTodoId(todo.id);
      setErrorMessage("");

      await deleteTodo(todo.id);

      setTodos((currentTodos) =>
        currentTodos.filter((currentTodo) => currentTodo.id !== todo.id)
      );
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      setErrorMessage(
        getErrorMessage(error, "Failed to delete TODO. Please try again.")
      );
    } finally {
      setDeletingTodoId(null);
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "-";
    }

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <section className="page-card">
      <div className="page-title">
        <h2>My TODO List</h2>
        <p>These TODO items are loaded from the protected backend API.</p>
      </div>

      <form className="todo-form" onSubmit={handleCreateSubmit} noValidate>
        <h3>Create TODO</h3>

        {createErrorMessage && (
          <div className="alert alert-error" role="alert">
            {createErrorMessage}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Example: Review backend API"
            maxLength={TODO_TITLE_MAX_LENGTH}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional description"
            rows={4}
            maxLength={TODO_DESCRIPTION_MAX_LENGTH}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create TODO"}
        </button>
      </form>

      <div className="todo-section-header">
        <h3>TODO Items</h3>
      </div>

      {isLoading && <p className="muted-text">Loading TODO list...</p>}

      {!isLoading && errorMessage && (
        <div className="alert alert-error" role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && todos.length === 0 && (
        <div className="empty-state">
          <h3>No TODO items yet</h3>
          <p>Create your first TODO using the form above.</p>
        </div>
      )}

      {!isLoading && todos.length > 0 && (
        <div className="todo-list">
          {todos.map((todo) => (
            <article className="todo-item" key={todo.id}>
              {editingTodoId === todo.id ? (
                <form
                  className="todo-edit-form"
                  onSubmit={(event) => handleEditSubmit(event, todo)}
                  noValidate
                >
                  <h3>Edit TODO</h3>

                  {editErrorMessage && (
                    <div className="alert alert-error" role="alert">
                      {editErrorMessage}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor={`edit-title-${todo.id}`}>Title</label>
                    <input
                      id={`edit-title-${todo.id}`}
                      name="title"
                      type="text"
                      value={editForm.title}
                      onChange={handleEditChange}
                      maxLength={TODO_TITLE_MAX_LENGTH}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`edit-description-${todo.id}`}>
                      Description
                    </label>
                    <textarea
                      id={`edit-description-${todo.id}`}
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      rows={4}
                      maxLength={TODO_DESCRIPTION_MAX_LENGTH}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`edit-due-date-${todo.id}`}>
                      Due date
                    </label>
                    <input
                      id={`edit-due-date-${todo.id}`}
                      name="dueDate"
                      type="date"
                      value={editForm.dueDate}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="todo-actions">
                    <button
                      type="submit"
                      disabled={updatingTodoId === todo.id}
                    >
                      {updatingTodoId === todo.id ? "Saving..." : "Save"}
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      disabled={updatingTodoId === todo.id}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="todo-item-header">
                    <div>
                      <h3>{todo.title}</h3>
                      <p>{todo.description || "No description"}</p>
                    </div>

                    <span
                      className={
                        todo.isCompleted
                          ? "status-badge status-completed"
                          : "status-badge status-pending"
                      }
                    >
                      {todo.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="todo-meta">
                    <span>Due date: {formatDate(todo.dueDateUtc)}</span>
                    <span>Created: {formatDate(todo.createdAtUtc)}</span>
                  </div>

                  <div className="todo-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      disabled={updatingTodoId === todo.id}
                      onClick={() => handleStartEdit(todo)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      disabled={updatingTodoId === todo.id}
                      onClick={() => handleToggleStatus(todo)}
                    >
                      {updatingTodoId === todo.id
                        ? "Updating..."
                        : todo.isCompleted
                          ? "Mark as Pending"
                          : "Mark as Completed"}
                    </button>

                    <button
                      type="button"
                      className="danger-button"
                      disabled={deletingTodoId === todo.id}
                      onClick={() => handleDeleteTodo(todo)}
                    >
                      {deletingTodoId === todo.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoListPage;
