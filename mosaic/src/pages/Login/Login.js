import React from "react";
import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await createUser(user);

    console.log(res);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Good to see you again!</h1>
      <p>Please, enter with your account and scroll it</p>
      <form onSubmit={handleSubmit}>
        <label>
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
        </label>

        {!loading && <button className="btn">Login</button>}
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

export default Login;
