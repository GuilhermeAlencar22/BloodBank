import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-art" />
        <div className="hero-text">
          <h1>Salve vidas<br />doando sangue</h1>
          <p>Um sistema completo para gestão de doadores, hospitais e solicitações de sangue.</p>
          <Link to="/cadastro" className="cta-button">Solicite sangue</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
