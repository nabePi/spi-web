// Runs once when the Next.js server starts. In production, initializing Payload
// applies pending migrations (prodMigrations) so the schema is up to date
// before the app serves traffic. A failed migration aborts startup.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { getPayload } = await import("payload");
  const { default: config } = await import("./payload.config");
  await getPayload({ config });
}
