import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { authSchema } from "@/lib/schema";

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.TURSO_DATABASE_URL) return process.env.TURSO_DATABASE_URL;
  if (process.env.VERCEL) return "file:/tmp/bazardor.db";
  return "file:./.data/bazardor.db";
}

const databaseAuthToken =
  process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

const globalForDb = globalThis as unknown as {
  libsqlClient?: Client;
};

const client =
  globalForDb.libsqlClient ??
  createClient({
    url: resolveDatabaseUrl(),
    authToken: databaseAuthToken || undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.libsqlClient = client;
}

export const db = drizzle(client, { schema: authSchema });
export { client as databaseClient };
