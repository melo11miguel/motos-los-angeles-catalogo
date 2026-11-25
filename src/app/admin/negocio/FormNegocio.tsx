"use client";

import { useActionState } from "react";
import { guardarNegocio, type Resultado } from "../acciones";
import type { Negocio } from "@/lib/datos";

const CAMPOS: { k: keyof Negocio; t: string; ayuda?: string }[] = [
  { k: "nombre", t: "Nombre del negocio", ayuda: "Sale en el mensaje de WhatsApp." },
  { k: "whatsapp", t: "WhatsApp", ayuda: "Con indicativo y sin + ni espacios. Ej: 573213701476" },
  { k: "direccion", t: "Dirección" },
  { k: "horario", t: "Horario" },
  { k: "instagram", t: "Usuario de Instagram", ayuda: "Sin @" },
  { k: "tiktok", t: "Usuario de TikTok", ayuda: "Sin @" },
  { k: "eslogan", t: "Eslogan" },
];

export default function FormNegocio({ negocio }: { negocio: Negocio }) {
  const [estado, accion, pendiente] = useActionState<Resultado, FormData>(guardarNegocio, {});
  return (
    <form action={accion} className="form form--uno">
      <div className="form__campos">
        {CAMPOS.map((c) => (
          <label key={c.k} className="campo">
            <span>{c.t}</span>
            <input
              name={c.k}
              defaultValue={negocio[c.k]}
              required={c.k === "nombre" || c.k === "whatsapp"}
              inputMode={c.k === "whatsapp" ? "numeric" : undefined}
            />
            {c.ayuda && <small>{c.ayuda}</small>}
          </label>
        ))}
        {estado.error && <p className="error">{estado.error}</p>}
        {estado.ok && <p className="aviso">Guardado. Ya se ve en el catálogo.</p>}
        <div className="form__pie">
          <button className="btn btn--pri" disabled={pendiente}>{pendiente ? "Guardando…" : "Guardar"}</button>
        </div>
      </div>
    </form>
  );
}
