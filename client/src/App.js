import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import Loader from "./components/Loader";
import "materialize-css";

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuth }}>
      <Router>
        <React.Fragment>
          {isAuth && <Navbar />}
          <div className="container">{routes}</div>
        </React.Fragment>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
