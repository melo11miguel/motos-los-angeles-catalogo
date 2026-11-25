import { listarProductos } from "@/lib/datos";

export async function sugerencias() {
  const todos = await listarProductos();
  const nombres: Record<string, string[]> = {};
  for (const p of todos) (nombres[p.seccion] ??= []).includes(p.nombre) || nombres[p.seccion].push(p.nombre);
  const marcas = [...new Set(todos.map((p) => p.marca).filter(Boolean))].sort();
  return { nombres, marcas };
}
