import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { useNewAuth } from "../../contexts/NewAuthContext";
import "../NewLogin/NewLogin.css";
import "./NewSignup.css";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const getPasswordStrength = (pw) => {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Weak", color: "#EF4444", width: "33%" };
  if (score <= 2) return { label: "Fair", color: "#F59E0B", width: "66%" };
  return { label: "Strong", color: "#10B981", width: "100%" };
};

const NewSignup = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle } = useNewAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validateStep2();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const result = await signUpWithEmail(formData);
      if (!result?.success) {
        setErrors({ general: result?.error || "Signup failed. Please try again." });
      }
    } catch (err) {
      setErrors({ general: err.message || "Signup failed. Please try again." });
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

  const strength = getPasswordStrength(formData.password);

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
            Your Next Home is One Click Away
          </h2>
          <p className="ami-auth-left__sub">
            Join thousands of Nigerians who use AMI Smart Homes to find, buy, and rent verified properties.
          </p>
          <div className="ami-signup-benefits">
            {["Access verified property listings", "Connect with trusted agents", "Save and compare properties", "Get notified on new listings"].map((b) => (
              <div key={b} className="ami-signup-benefit">
                <FaCheck className="ami-signup-benefit__icon" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="ami-auth-right">
        <div className="ami-auth-form-wrap">
          <button className="ami-auth-back" onClick={() => step === 2 ? setStep(1) : navigate("/")} aria-label="Back">
            <FaArrowLeft /> {step === 2 ? "Back" : "Back to Home"}
          </button>

          {/* Step indicator */}
          <div className="ami-signup-steps">
            <div className={`ami-signup-step ${step >= 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}>
              <div className="ami-signup-step__dot">{step > 1 ? <FaCheck /> : "1"}</div>
              <span>Your Info</span>
            </div>
            <div className="ami-signup-step__line" />
            <div className={`ami-signup-step ${step >= 2 ? "active" : ""}`}>
              <div className="ami-signup-step__dot">2</div>
              <span>Password</span>
            </div>
          </div>

          <div className="ami-auth-form-header">
            <h1>{step === 1 ? "Create Account" : "Set Your Password"}</h1>
            <p>{step === 1 ? "Start finding your dream property today" : "Choose a strong password to secure your account"}</p>
          </div>

          {errors.general && <div className="ami-auth-error">{errors.general}</div>}

          {/* Step 1 */}
          {step === 1 && (
            <>
              <div className="ami-auth-field">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "error" : ""}
                  autoComplete="name"
                />
                {errors.name && <span className="ami-auth-field-error">{errors.name}</span>}
              </div>

              <div className="ami-auth-field">
                <label htmlFor="signup-email">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "error" : ""}
                  autoComplete="email"
                />
                {errors.email && <span className="ami-auth-field-error">{errors.email}</span>}
              </div>

              <button type="button" className="ami-auth-submit" onClick={handleNext}>
                Continue
              </button>

              <div className="ami-auth-divider"><span>or sign up with</span></div>

              <button className="ami-auth-google" onClick={handleGoogle} disabled={googleLoading}>
                {googleLoading ? <span className="ami-auth-spinner ami-auth-spinner--dark" /> : <GoogleIcon />}
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="ami-auth-field">
                <label htmlFor="signup-password">Password</label>
                <div className="ami-auth-field__password">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={errors.password ? "error" : ""}
                    autoComplete="new-password"
                  />
                  <button type="button" className="ami-auth-field__eye" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="ami-auth-field-error">{errors.password}</span>}
                {strength && (
                  <div className="ami-password-strength">
                    <div className="ami-password-strength__bar">
                      <div style={{ width: strength.width, background: strength.color }} />
                    </div>
                    <span style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                )}
              </div>

              <div className="ami-auth-field">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <div className="ami-auth-field__password">
                  <input
                    id="signup-confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "error" : ""}
                    autoComplete="new-password"
                  />
                  <button type="button" className="ami-auth-field__eye" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="ami-auth-field-error">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="ami-auth-submit" disabled={loading}>
                {loading ? <span className="ami-auth-spinner" /> : "Create Account"}
              </button>
            </form>
          )}

          <p className="ami-auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="ami-auth-switch-link">Sign in</Link>
          </p>

          <p className="ami-auth-terms">
            By creating an account you agree to our{" "}
            <Link to="/terms-of-service">Terms of Service</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewSignup;
