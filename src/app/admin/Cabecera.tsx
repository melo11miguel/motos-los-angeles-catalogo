import Link from "next/link";
import { salir } from "./acciones";

export default function Cabecera() {
  return (
    <header className="cab">
      <Link href="/admin" className="cab__marca">
        <b>MOTOS</b> LOS ÁNGELES <span>· Panel</span>
      </Link>
      <nav className="cab__nav">
        <a href="/" target="_blank" rel="noopener">Ver catálogo ↗</a>
        <Link href="/admin/negocio">Datos del negocio</Link>
        <form action={salir}>
          <button className="lnk">Salir</button>
        </form>
      </nav>
    </header>
  );
}
