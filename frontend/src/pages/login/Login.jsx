import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((username.toLowerCase() === "guilherme") && password === "09891333469") {
      sessionStorage.setItem('auth', 'true'); // trocado para sessionStorage
      navigate("/sistema");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="register-section">
      <div className="register-header">
        <h2>Login do Atendente</h2>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
