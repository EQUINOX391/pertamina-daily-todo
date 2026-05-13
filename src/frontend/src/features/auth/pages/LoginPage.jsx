function LoginPage() {
  return (
    <section className="page-card">
      <h2>Login</h2>
      <p>
        Login form will be implemented in the next step and integrated with
        the backend JWT authentication endpoint.
      </p>

      <div className="placeholder-box">
        <p>Planned endpoint:</p>
        <code>POST /api/auth/login</code>
      </div>
    </section>
  );
}

export default LoginPage;
