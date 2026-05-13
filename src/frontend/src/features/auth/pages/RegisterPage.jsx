import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../../api/authApi";
import { saveAccessToken } from "../../../utils/tokenStorage";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
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
    if (!form.fullName.trim()) {
      return "Full name is required.";
    }

    if (form.fullName.trim().length > 100) {
      return "Full name must not exceed 100 characters.";
    }

    if (!form.email.trim()) {
      return "Email is required.";
    }

    if (!form.password) {
      return "Password is required.";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
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

    return "Registration failed. Please check your input.";
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

      const result = await registerUser({
        fullName: form.fullName.trim(),
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
        <h2>Register</h2>
        <p>Create an account to start managing your personal TODO list.</p>
      </div>

      {errorMessage && (
        <div className="alert alert-error" role="alert">
          {errorMessage}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="User Example"
            autoComplete="name"
          />
        </div>

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
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="auth-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
