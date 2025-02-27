import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Register.module.css";

import { useEffect, useState } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };
    if (password !== confirmPassword) {
      setError("Passwords must be the same");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
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
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Your E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Password</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {!loading && <button className="btn">Register</button>}
        {loading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {error && <p className="error"> {error} </p>}
      </form>
    </div>
  );
};

export default Register;
