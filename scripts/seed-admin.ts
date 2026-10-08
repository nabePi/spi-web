import { getPayload, type SanitizedConfig } from "payload";

async function seedAdmin(config: SanitizedConfig) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("cms:seed-admin is disabled in production.");
  }

  const email = process.env.CMS_ADMIN_EMAIL || "admin@pemikiranislam.id";
  const password = process.env.CMS_ADMIN_PASSWORD || "AdminSPI2026!";
  const name = "SPI Local Administrator";
  const payload = await getPayload({ config });

  try {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "users",
        id: existing.docs[0].id,
        data: { name, password },
      });
      console.log(`Updated local CMS administrator: ${email}`);
    } else {
      await payload.create({
        collection: "users",
        data: { email, name, password },
      });
      console.log(`Created local CMS administrator: ${email}`);
    }
  } finally {
    await payload.destroy();
  }
}

export function script(config: SanitizedConfig) {
  return seedAdmin(config).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
