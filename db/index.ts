import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is niet ingesteld. Voeg de Neon Postgres connection string toe als environment variable."
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}
