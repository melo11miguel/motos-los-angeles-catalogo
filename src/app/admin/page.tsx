import Link from "next/link";
import Cabecera from "./Cabecera";
import { alternarVisible, cambiarPrecio, mover } from "./acciones";
import { listarProductos } from "@/lib/datos";
import { LISTA_SECCIONES, SECCIONES, categoriasDe, esSeccion, type Seccion } from "@/lib/secciones";

export const dynamic = "force-dynamic";

const MENSAJES: Record<string, string> = {
  guardado: "Producto guardado. Ya se ve en el catálogo.",
  borrado: "Producto borrado.",
};

const pesos = (n: number | null) => (n == null ? "" : n.toLocaleString("es-CO"));

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; q?: string; msg?: string }>;
}) {
  const sp = await searchParams;
  const seccion: Seccion = esSeccion(sp.s) ? sp.s : "cascos";
  const q = (sp.q ?? "").trim().toLowerCase();
  const todos = await listarProductos();
  const conteo = Object.fromEntries(
    LISTA_SECCIONES.map((s) => [s, todos.filter((p) => p.seccion === s).length]),
  );
  const cats = categoriasDe(seccion);
  const lista = todos
    .filter((p) => p.seccion === seccion)
    .filter((p) => !q || `${p.nombre} ${p.version} ${p.marca}`.toLowerCase().includes(q));

  return (
    <>
      <Cabecera />
      <main className="cont">
        {sp.msg && MENSAJES[sp.msg] && <p className="aviso">{MENSAJES[sp.msg]}</p>}

        <nav className="tabs">
          {LISTA_SECCIONES.map((s) => (
            <Link key={s} href={`/admin?s=${s}`} className={s === seccion ? "on" : ""}>
              {SECCIONES[s].nombre} <small>{conteo[s]}</small>
            </Link>
          ))}
        </nav>

        <div className="barra">
          <form className="buscar">
            <input type="hidden" name="s" value={seccion} />
            <input type="search" name="q" defaultValue={sp.q ?? ""} placeholder="Buscar por nombre, color o marca…" />
          </form>
          <Link href={`/admin/producto/nuevo?s=${seccion}`} className="btn btn--pri">
            + Agregar producto
          </Link>
        </div>

        {lista.length === 0 && <p className="vacio">No hay productos {q ? "con esa búsqueda" : "en esta sección"}.</p>}

        <ul className="lista">
          {lista.map((p, i) => (
            <li key={p.id} className={"fila" + (p.activo ? "" : " fila--oculta")}>
              <Link href={`/admin/producto/${p.id}`} className="fila__foto">
                {p.img ? <img src={p.img} alt="" loading="lazy" /> : <span>SIN FOTO</span>}
              </Link>
              <Link href={`/admin/producto/${p.id}`} className="fila__info">
                <b>{p.nombre}</b>
                <span>{p.version}</span>
                <span className="fila__meta">
                  {p.marca} · {cats[p.categoria] ?? p.categoria}
                  {!p.activo && <em className="tag tag--gris">OCULTO</em>}
                  {p.destacado && <em className="tag tag--azul">DESTACADO</em>}
                  {p.nino && <em className="tag tag--verde">NIÑO</em>}
                </span>
              </Link>
              <form action={cambiarPrecio} className="fila__precio">
                <input type="hidden" name="id" value={p.id} />
                <span>$</span>
                <input
                  name="precio"
                  inputMode="numeric"
                  defaultValue={pesos(p.precio)}
                  placeholder="Por definir"
                  aria-label={`Precio de ${p.nombre} ${p.version}`}
                />
                <button className="btn btn--sm" title="Guardar precio">Guardar</button>
              </form>
              <div className="fila__acc">
                <form action={mover}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="dir" value="arriba" />
                  <button className="ico" title="Subir" disabled={i === 0 || !!q}>↑</button>
                </form>
                <form action={mover}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="dir" value="abajo" />
                  <button className="ico" title="Bajar" disabled={i === lista.length - 1 || !!q}>↓</button>
                </form>
                <form action={alternarVisible}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="ico ico--txt" title={p.activo ? "Ocultar del catálogo" : "Mostrar en el catálogo"}>
                    {p.activo ? "Ocultar" : "Mostrar"}
                  </button>
                </form>
                <Link href={`/admin/producto/${p.id}`} className="ico ico--txt">Editar</Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
