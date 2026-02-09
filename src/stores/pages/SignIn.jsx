import React from "react";

const SignIn = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>

        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />

        <button className="auth-btn">Login</button>

        <p className="auth-text">
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
