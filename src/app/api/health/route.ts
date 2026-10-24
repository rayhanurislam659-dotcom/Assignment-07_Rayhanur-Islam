import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function redact(message: string) {
  const secrets = [
    process.env.BETTER_AUTH_SECRET,
    process.env.DATABASE_AUTH_TOKEN,
    process.env.TURSO_AUTH_TOKEN,
  ].filter((value): value is string => Boolean(value));

  return secrets.reduce(
    (text, secret) => text.replaceAll(secret, "[redacted]"),
    message,
  );
}

function describeDatabaseUrl() {
  const url =
    process.env.DATABASE_URL ||
    process.env.TURSO_DATABASE_URL ||
    (process.env.VERCEL ? "file:/tmp/bazardor.db" : "file:./.data/bazardor.db");

  return {
    scheme: url.slice(0, url.indexOf(":")),
    configured:
      Boolean(process.env.DATABASE_URL) ||
      Boolean(process.env.TURSO_DATABASE_URL),
    hasToken: Boolean(
      process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN,
    ),
  };
}

export async function GET() {
  let auth:
    | { ready: true }
    | { ready: false; error: string } = { ready: false, error: "not checked" };

  try {
    const { auth: betterAuth } = await import("@/lib/auth");
    await betterAuth.$context;
    auth = { ready: true };
  } catch (error) {
    auth = {
      ready: false,
      error: redact(error instanceof Error ? error.message : String(error)),
    };
  }

  let database:
    | { reachable: true; tables: string[] }
    | { reachable: false; error: string } = {
    reachable: false,
    error: "not checked",
  };

  try {
    const { databaseClient } = await import("@/lib/db");
    const result = await databaseClient.execute(
      "select name from sqlite_master where type = 'table' order by name",
    );
    database = {
      reachable: true,
      tables: result.rows.map((row) => String(row.name)),
    };
  } catch (error) {
    database = {
      reachable: false,
      error: redact(error instanceof Error ? error.message : String(error)),
    };
  }

  return NextResponse.json(
    {
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      auth: {
        ...auth,
        hasSecret: Boolean(process.env.BETTER_AUTH_SECRET),
        baseUrl: process.env.BETTER_AUTH_URL ?? null,
        vercelUrl: process.env.VERCEL_URL ?? null,
        productionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null,
      },
      database: {
        ...describeDatabaseUrl(),
        ...database,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
