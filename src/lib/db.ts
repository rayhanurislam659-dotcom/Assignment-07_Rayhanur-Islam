import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { authSchema } from "@/lib/schema";

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.VERCEL) return "file:/tmp/bazardor.db";
  return "file:./.data/bazardor.db";
}

const globalForDb = globalThis as unknown as {
  libsqlClient?: Client;
};

const client =
  globalForDb.libsqlClient ??
  createClient({
    url: resolveDatabaseUrl(),
    authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.libsqlClient = client;
}

export const db = drizzle(client, { schema: authSchema });
export { client as databaseClient };
