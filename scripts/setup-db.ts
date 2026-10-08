import { getPayload, type SanitizedConfig } from "payload";

async function setupDatabase(config: SanitizedConfig) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("db:setup is for local development only. Apply production migrations instead.");
  }

  const payload = await getPayload({ config });

  try {
    console.log("PostgreSQL schema is ready.");
  } finally {
    await payload.destroy();
  }
}

export function script(config: SanitizedConfig) {
  return setupDatabase(config).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
