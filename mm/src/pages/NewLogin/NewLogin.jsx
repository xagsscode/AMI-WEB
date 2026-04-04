import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNewAuth } from "../../contexts/NewAuthContext";
import "./NewLogin.css";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const NewLogin = () => {
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle } = useNewAuth();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      await signInWithEmail(formData.email, formData.password, formData.rememberMe);
    } catch {
      setErrors({ general: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try { await signInWithGoogle(); }
    catch { setErrors({ general: "Google sign-in failed. Please try again." }); }
    finally { setGoogleLoading(false); }
  };

  return (
    <div className="ami-auth-page">
      {/* Left panel */}
      <div className="ami-auth-left">
        <div className="ami-auth-left__overlay" />
        <div className="ami-auth-left__content">
          <div className="ami-auth-left__logo">
            <div className="ami-auth-left__logo-icon"><FaHome /></div>
            <div>
              <div className="ami-auth-left__logo-name">AMI Smart Homes</div>
              <div className="ami-auth-left__logo-sub">& Properties</div>
            </div>
          </div>
          <h2 className="ami-auth-left__headline">
            Find Your Dream Property in Nigeria
          </h2>
          <p className="ami-auth-left__sub">
            Buy, rent, or invest in verified properties with Nigeria's most trusted real estate platform.
          </p>
          <div className="ami-auth-left__stats">
            <div className="ami-auth-left__stat"><span>5,000+</span><small>Properties</small></div>
            <div className="ami-auth-left__stat"><span>3,200+</span><small>Happy Clients</small></div>
            <div className="ami-auth-left__stat"><span>120+</span><small>Agents</small></div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="ami-auth-right">
        <div className="ami-auth-form-wrap">
          <button className="ami-auth-back" onClick={() => navigate("/")} aria-label="Back to home">
            <FaArrowLeft /> Back to Home
          </button>

          <div className="ami-auth-form-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your AMI Smart Homes account</p>
          </div>

          {errors.general && (
            <div className="ami-auth-error">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="ami-auth-field">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "error" : ""}
                autoComplete="email"
              />
              {errors.email && <span className="ami-auth-field-error">{errors.email}</span>}
            </div>

            <div className="ami-auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="ami-auth-field__password">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={errors.password ? "error" : ""}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="ami-auth-field__eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="ami-auth-field-error">{errors.password}</span>}
            </div>

            <div className="ami-auth-row">
              <label className="ami-auth-checkbox">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange("rememberMe", e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="ami-auth-link-btn" onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="ami-auth-submit"
              disabled={loading || !formData.email || !formData.password}
            >
              {loading ? <span className="ami-auth-spinner" /> : "Sign In"}
            </button>
          </form>

          <div className="ami-auth-divider"><span>or continue with</span></div>

          <button className="ami-auth-google" onClick={handleGoogle} disabled={googleLoading || loading}>
            {googleLoading ? <span className="ami-auth-spinner ami-auth-spinner--dark" /> : <GoogleIcon />}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <p className="ami-auth-switch">
            Don't have an account?{" "}
            <Link to="/signup" className="ami-auth-switch-link">Create account</Link>
          </p>

          <p className="ami-auth-terms">
            By signing in you agree to our{" "}
            <Link to="/terms-of-service">Terms of Service</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
