import "server-only";
import postgres from "postgres";
import seed from "./seed.json";

type Sql = ReturnType<typeof postgres>;

const g = globalThis as unknown as { __sql?: Sql; __esquema?: Promise<void> };

export function sql(): Sql {
  if (!g.__sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Falta DATABASE_URL: conecta Neon al proyecto en Vercel.");
    g.__sql = postgres(url, { max: 3, prepare: false, idle_timeout: 20 });
  }
  return g.__sql;
}

export function listo(): Promise<void> {
  if (!g.__esquema) {
    g.__esquema = crearEsquema().catch((e) => {
      g.__esquema = undefined;
      throw e;
    });
  }
  return g.__esquema;
}

async function crearEsquema() {
  const db = sql();
  await db.begin(async (tx) => {
    await tx`select pg_advisory_xact_lock(727274)`;
    await tx`
      create table if not exists productos (
        id text primary key,
        seccion text not null,
        nombre text not null,
        version text not null default '',
        precio integer,
        categoria text not null,
        marca text not null default '',
        img text,
        destacado boolean not null default false,
        nino boolean not null default false,
        activo boolean not null default true,
        orden integer not null default 0,
        creado timestamptz not null default now(),
        actualizado timestamptz not null default now()
      )`;
    await tx`create index if not exists productos_seccion_orden on productos (seccion, orden)`;
    await tx`
      create table if not exists ajustes (
        clave text primary key,
        valor jsonb not null
      )`;
    const nuevo = await tx`
      insert into ajustes (clave, valor) values ('datos_iniciales', 'true'::jsonb)
      on conflict (clave) do nothing
      returning clave`;
    if (nuevo.length === 0) return;
    await tx`
      insert into ajustes (clave, valor) values ('negocio', ${tx.json(seed.negocio)})
      on conflict (clave) do nothing`;
    for (const p of seed.productos) {
      await tx`
        insert into productos ${tx(p, "id", "seccion", "nombre", "version", "precio", "categoria", "marca", "img", "destacado", "nino", "activo", "orden")}
        on conflict (id) do nothing`;
    }
  });
}
