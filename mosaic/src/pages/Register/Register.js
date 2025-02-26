import styles from "./Register.module.css";

import { useEffect, useState } from "react";

const Register = () => {
  return (
    <div>
      <h1>register to post</h1>
      <p>Create your username and share your memories and stories!</p>
      <form>
        <label>
          <span>Username</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Your Username"
          />
          <span>E-mail</span>
          <input type="email" name="email" required placeholder="Your E-mail" />
          <span>Password</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
          />
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </label>
        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
