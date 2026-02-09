import React from "react";

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name" className="auth-input" />
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />

        <button className="auth-btn">Sign Up</button>

        <p className="auth-text">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
