import React from "react";

export default function Recover() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        backgroundColor: "#0f172a",
      }}
    >
      <h1>Recuperar Contraseña</h1>
      <p>Ingresa tu correo para recuperar tu contraseña</p>
      <input
        type="email"
        placeholder="Correo electrónico"
        style={{
          padding: "10px",
          borderRadius: "5px",
          margin: "10px",
          width: "250px",
        }}
      />
      <button
        style={{
          backgroundColor: "#7c3aed",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Enviar enlace
      </button>
    </div>
  );
}