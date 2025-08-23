import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Target, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { API } from "../api";

const LoginPage = ({ setUser, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/dashboard";

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const emailError = !email ? "Email is required" : (!isValidEmail(email) ? "Please enter a valid email address" : "");
  const passwordError = !password ? "Password is required" : (password.length < 6 ? "Password must be at least 6 characters" : "");
  const formValid = !emailError && !passwordError;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    // basic client-side validation
    if (!formValid) {
      setLoading(false);
      return;
    }

    API.login({ email, password })
      .then((resp) => {
        const receivedToken = resp.token;
        if (remember) {
          localStorage.setItem('token', receivedToken);
          sessionStorage.removeItem('token');
        } else {
          sessionStorage.setItem('token', receivedToken);
          localStorage.removeItem('token');
        }
        setToken(receivedToken);
        return API.me(receivedToken);
      })
      .then((me) => {
        setUser(me);
        setSuccess("Signed in successfully");
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        setError(err.message || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              aria-invalid={emailTouched && !!emailError}
              className={`mt-1 block w-full border rounded-md p-2 ${emailTouched && emailError ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
            />
            {emailTouched && emailError && (
              <p className="mt-1 text-xs text-red-600">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                aria-invalid={passwordTouched && !!passwordError}
                className={`mt-1 block w-full border rounded-md p-2 pr-10 ${passwordTouched && passwordError ? 'border-red-500' : ''}`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {passwordTouched && passwordError && (
              <p className="mt-1 text-xs text-red-600">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</Link>
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !formValid}
            className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
