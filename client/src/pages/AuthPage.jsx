import { useContext, useEffect, useState } from "react";
import UseHttp from "../hooks/http.hook";
import UseMessage from "../hooks/message.hook";
import AuthContext from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = UseMessage();
  const { loading, request, error, clearError } = UseHttp();

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="row" style={{ padding: "1rem", textAlign: "center" }}>
      <div className="col s6 offset-s3">
        <h1>Auth Page</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
          </div>

          <div>
            <div className="input-field">
              <input
                placeholder="Please, enter your email"
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Please, enter your pass"
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
