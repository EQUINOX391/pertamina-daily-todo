import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../../api/authApi";
import { saveAccessToken } from "../../../utils/tokenStorage";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!form.email.trim()) {
      return "Email is required.";
    }

    if (!form.password) {
      return "Password is required.";
    }

    return "";
  }

  function getErrorMessage(error) {
    const responseMessage = error.response?.data?.message;

    if (responseMessage) {
      return responseMessage;
    }

    const validationErrors = error.response?.data?.errors;

    if (validationErrors) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      return validationErrors[firstErrorKey][0];
    }

    return "Login failed. Please check your email and password.";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");

    const validationMessage = validateForm();

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      saveAccessToken(result.token);

      navigate("/todos", { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page-card auth-page">
      <div className="page-title">
        <h2>Login</h2>
        <p>Sign in to manage your personal TODO list.</p>
      </div>

      {errorMessage && (
        <div className="alert alert-error" role="alert">
          {errorMessage}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="user@example.com"
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="auth-link">
        Do not have an account yet? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}

export default LoginPage;
