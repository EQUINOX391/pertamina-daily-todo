import { Link, Outlet, useNavigate } from "react-router";
import { removeAccessToken, isAuthenticated } from "../utils/tokenStorage";

function AppLayout() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  function handleLogout() {
    removeAccessToken();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Pertamina Daily TODO</h1>
          <p>Frontend foundation for Daily TODO List study case</p>
        </div>

        <nav className="app-nav">
          <Link to="/todos">Todos</Link>

          {!authenticated && <Link to="/login">Login</Link>}
          {!authenticated && <Link to="/register">Register</Link>}

          {authenticated && (
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
