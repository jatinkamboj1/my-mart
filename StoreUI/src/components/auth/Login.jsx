"use client";
import "@/styles/login.scss";
import Link from "next/link";
import { useAuthHandler, useSignupHandler, useForgotPasswordHandler } from "@/hooks/auth";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

export function SignInForm() {
    const { handleLogin, error, rememberMe, setRememberMe } = useAuthHandler();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleLogin(formData.get("email"), formData.get("password"), "/");
    };
    
    return (
        <div className="login-reg-form-wrap">
            <h5>Sign In</h5>
            <form method="post" onSubmit={handleSubmit}>
                <div className="single-input-item">
                    <input name="email" type="email" placeholder="Email or Username" required />
                </div>
                <div className="single-input-item">
                    <input name="password" type="password" placeholder="Enter your Password" required />
                </div>
                <div className="single-input-item">
                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                        <div className="remember-meta">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label className="custom-control-label" htmlFor="rememberMe">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <Link href="/forgot-password" className="forget-pwd">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <div className="single-input-item">
                    <button className="btn btn-sqr">Login</button>
                </div>
                {error && <p className="error-text">{error}</p>}
            </form>
            <p className="text-center mt-4">Don&lsquo;t have an Account? <a href="/signup">Create Account</a></p>
        </div>
    );
}


/* ---------------- Password Strength Logic ---------------- */
function getPasswordStrength(password) {
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  let label = "Weak";
  if (score === 5) label = "Strong";
  else if (score >= 3) label = "Medium";

  return { score, label, rules };
}

/* ---------------- Strength UI ---------------- */
function PasswordStrength({ password }) {
  const { score, label, rules } = getPasswordStrength(password);

  return (
    <div style={{ marginTop: "8px" }}>
      {/* Progress bar */}
      <div
        style={{
          height: "6px",
          width: "100%",
          background: "#eee",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(score / 5) * 100}%`,
            background:
              score <= 2 ? "red" : score === 3 || score === 4 ? "orange" : "green",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p style={{ fontSize: "12px" }}>
        Strength: <strong>{label}</strong>
      </p>

      <ul style={{ fontSize: "12px", paddingLeft: "16px" }}>
        <li style={{ color: rules.length ? "green" : "red" }}>
          {rules.length ? "✔" : "✖"} 8+ characters
        </li>
        <li style={{ color: rules.uppercase ? "green" : "red" }}>
          {rules.uppercase ? "✔" : "✖"} Uppercase letter
        </li>
        <li style={{ color: rules.lowercase ? "green" : "red" }}>
          {rules.lowercase ? "✔" : "✖"} Lowercase letter
        </li>
        <li style={{ color: rules.number ? "green" : "red" }}>
          {rules.number ? "✔" : "✖"} Number
        </li>
        <li style={{ color: rules.special ? "green" : "red" }}>
          {rules.special ? "✔" : "✖"} Special character
        </li>
      </ul>
    </div>
  );
}

/* ---------------- Main Component ---------------- */
export function SignUpForm() {
  const {
    formData,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isLoading,
    message,
  } = useSignupHandler();

  const [error, setError] = useState("");

  if (isLoading) return <LoadingScreen />;
  if (message) return <p>{message}</p>;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    // Validation
    if (!password || password.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      return setError("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      return setError("Password must contain at least one special character");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");
    handleSubmit(e); // call original submit
  };

  return (
    <div className="login-reg-form-wrap sign-up-form">
      <h5>Signup</h5>

      {/* Error */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="row">
        <div className="col-12 single-input-item">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 single-input-item">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 single-input-item">
          <PhoneInput
            country={"in"}
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            containerClass="w-100"
            inputClass="form-control w-100"
            buttonClass="btn w-auto"
          />
        </div>

          <div className="col-lg-6">
            <div className="single-input-item">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* 🔥 Live Strength Meter */}
              <PasswordStrength password={formData.password} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="single-input-item">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

        <div className="single-input-item">
          <div className="login-reg-form-meta">
            <div className="remember-meta">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="subnewsletter"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor="subnewsletter"
                >
                  Subscribe to Our Newsletter
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="single-input-item">
          <button type="submit" className="btn btn-sqr">
            Register
          </button>
        </div>
        </div>
      </form>

      <p className="text-center mt-4">
        Already have an Account? <Link href="/signin">SignIn</Link>
      </p>
    </div>
  );
}

export function ForgotPasswordForm() {
  const {
    step,
    formData,
    loading,
    handleChange,
    sendOtp,
    verifyOtpStep,
    resetPasswordStep,
  } = useForgotPasswordHandler();

  return (
    <div className="login-reg-form-wrap">
      <h5>Forgot Password</h5>

      {/* Step 1 */}
      {step === 1 && (
        <form onSubmit={sendOtp}>
          <div className="single-input-item">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="single-input-item">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-sqr"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <form onSubmit={verifyOtpStep}>
          <div className="single-input-item">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-sqr"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <form onSubmit={resetPasswordStep}>
          <div className="single-input-item">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="single-input-item">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-sqr"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}