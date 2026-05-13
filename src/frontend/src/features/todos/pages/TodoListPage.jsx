function TodoListPage() {
  return (
    <section className="page-card">
      <h2>My TODO List</h2>
      <p>
        This page will display TODO items owned by the authenticated user.
      </p>

      <div className="placeholder-box">
        <p>Planned protected endpoint:</p>
        <code>GET /api/todos</code>
      </div>
    </section>
  );
}

export default TodoListPage;
