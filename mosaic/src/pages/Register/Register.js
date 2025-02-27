import styles from "./Register.module.css";

import { useEffect, useState } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
    }

    console.log(user);
  };

  return (
    <div className={styles.register}>
      <h1>Register to Post</h1>
      <p>Create your username and share your memories and stories!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Your Username"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="btn">Register</button>
        {error && <p className="error"> {error} </p>}
      </form>
    </div>
  );
};

export default Register;
