"use client";

import { useActionState } from "react";
import { entrar, type Resultado } from "../acciones";

export default function Entrar() {
  const [estado, accion, pendiente] = useActionState<Resultado, FormData>(entrar, {});
  return (
    <main className="entrar">
      <form action={accion} className="caja">
        <h1>
          <b>MOTOS</b> LOS ÁNGELES
        </h1>
        <p className="sub">Panel de administración</p>
        <label className="campo">
          <span>Contraseña</span>
          <input type="password" name="clave" required autoFocus autoComplete="current-password" />
        </label>
        {estado.error && <p className="error">{estado.error}</p>}
        <button className="btn btn--pri" disabled={pendiente}>
          {pendiente ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
