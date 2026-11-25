"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { guardarProducto } from "../acciones";
import { LISTA_SECCIONES, SECCIONES, type Seccion } from "@/lib/secciones";
import type { Producto } from "@/lib/datos";

type Props = {
  producto: Producto | null;
  seccionInicial: Seccion;
  nombres: Record<string, string[]>;
  marcas: string[];
};

const LADO_MAX = 1400;

async function prepararFoto(archivo: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(archivo, { imageOrientation: "from-image" });
    const escala = Math.min(1, LADO_MAX / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * escala);
    const h = Math.round(bmp.height * escala);
    const lienzo = document.createElement("canvas");
    lienzo.width = w;
    lienzo.height = h;
    lienzo.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
    bmp.close();
    const blob = await new Promise<Blob | null>((ok) => lienzo.toBlob(ok, "image/webp", 0.82));
    if (blob && blob.type === "image/webp") return new File([blob], "foto.webp", { type: "image/webp" });
    const jpg = await new Promise<Blob | null>((ok) => lienzo.toBlob(ok, "image/jpeg", 0.85));
    if (jpg) return new File([jpg], "foto.jpg", { type: "image/jpeg" });
  } catch {
    /* si el navegador no puede leerla, se intenta subir tal cual */
  }
  return archivo;
}

export default function FormProducto({ producto, seccionInicial, nombres, marcas }: Props) {
  const router = useRouter();
  const [seccion, setSeccion] = useState<Seccion>(producto?.seccion ?? seccionInicial);
  const [vista, setVista] = useState<string | null>(producto?.img ?? null);
  const [foto, setFoto] = useState<File | null>(null);
  const [quitar, setQuitar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const inputFoto = useRef<HTMLInputElement>(null);
  const categorias = SECCIONES[seccion].categorias;
  const sugerencias = useMemo(() => nombres[seccion] ?? [], [nombres, seccion]);

  async function elegirFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setProcesando(true);
    setError(null);
    const lista = await prepararFoto(archivo);
    setFoto(lista);
    setQuitar(false);
    setVista(URL.createObjectURL(lista));
    setProcesando(false);
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.delete("foto_original");
    if (foto) fd.set("foto", foto);
    if (quitar) fd.set("quitar_foto", "on");
    try {
      const r = await guardarProducto(fd);
      if (r.error) {
        setError(r.error);
        setEnviando(false);
        return;
      }
      router.push(`/admin?s=${r.seccion}&msg=guardado`);
      router.refresh();
    } catch {
      setError("No se pudo guardar. Revisa la conexión e intenta de nuevo.");
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="form">
      {producto && <input type="hidden" name="id" value={producto.id} />}

      <div className="form__foto">
        <button type="button" className="foto" onClick={() => inputFoto.current?.click()}>
          {vista && !quitar ? <img src={vista} alt="" /> : <span>Toca para subir foto</span>}
          {procesando && <i className="foto__cargando">Preparando foto…</i>}
        </button>
        <input
          ref={inputFoto}
          type="file"
          name="foto_original"
          accept="image/*"
          hidden
          onChange={elegirFoto}
        />
        <div className="foto__acc">
          <button type="button" className="btn btn--sm" onClick={() => inputFoto.current?.click()}>
            {vista && !quitar ? "Cambiar foto" : "Subir foto"}
          </button>
          {vista && !quitar && (
            <button
              type="button"
              className="btn btn--sm btn--ghost"
              onClick={() => {
                setQuitar(true);
                setFoto(null);
                if (inputFoto.current) inputFoto.current.value = "";
              }}
            >
              Quitar foto
            </button>
          )}
        </div>
      </div>

      <div className="form__campos">
        <div className="dos">
          <label className="campo">
            <span>Sección</span>
            <select
              name="seccion"
              value={seccion}
              onChange={(e) => setSeccion(e.target.value as Seccion)}
            >
              {LISTA_SECCIONES.map((s) => (
                <option key={s} value={s}>{SECCIONES[s].nombre}</option>
              ))}
            </select>
          </label>
          <label className="campo">
            <span>Categoría</span>
            <select
              name="categoria"
              key={seccion}
              defaultValue={producto?.seccion === seccion ? producto.categoria : Object.keys(categorias)[0]}
            >
              {Object.entries(categorias).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="campo">
          <span>Nombre o referencia</span>
          <input name="nombre" required maxLength={120} defaultValue={producto?.nombre} list="nombres" placeholder="Ej: ICH 501" />
          <datalist id="nombres">
            {sugerencias.map((n) => <option key={n} value={n} />)}
          </datalist>
          <small>Si escribes un nombre que ya existe, se agrupa en la misma tarjeta como otro diseño.</small>
        </label>

        <label className="campo">
          <span>Color o versión</span>
          <input name="version" maxLength={120} defaultValue={producto?.version} placeholder="Ej: Negro mate" />
        </label>

        <div className="dos">
          <label className="campo">
            <span>Marca</span>
            <input name="marca" maxLength={60} defaultValue={producto?.marca} list="marcas" placeholder="Ej: ICH" />
            <datalist id="marcas">
              {marcas.map((m) => <option key={m} value={m} />)}
            </datalist>
          </label>
          <label className="campo">
            <span>Precio (pesos)</span>
            <input
              name="precio"
              inputMode="numeric"
              defaultValue={producto?.precio != null ? producto.precio.toLocaleString("es-CO") : ""}
              placeholder="Vacío = Por definir"
            />
          </label>
        </div>

        <div className="checks">
          <label><input type="checkbox" name="activo" defaultChecked={producto?.activo ?? true} /> Visible en el catálogo</label>
          <label><input type="checkbox" name="destacado" defaultChecked={producto?.destacado} /> Destacado</label>
          <label><input type="checkbox" name="nino" defaultChecked={producto?.nino} /> Para niño</label>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form__pie">
          <Link href={`/admin?s=${producto?.seccion ?? seccionInicial}`} className="btn btn--ghost">Cancelar</Link>
          <button className="btn btn--pri" disabled={enviando || procesando}>
            {enviando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
}
