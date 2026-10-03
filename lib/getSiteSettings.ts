import { siteConfig } from "@/lib/siteConfig";

export interface SiteSettingsData {
  general: {
    siteName: string;
    tagline?: string | null;
    logoLight?: { url?: string; alt?: string } | null;
    logoDark?: { url?: string; alt?: string } | null;
    favicon?: { url?: string } | null;
  };
  seo: {
    defaultTitle: string;
    defaultDescription?: string | null;
    keywords?: string | null;
    defaultOgImage?: { url?: string } | null;
    locale: string;
  };
  contact: {
    email: string;
    phone?: string | null;
    whatsapp?: string | null;
    address?: string | null;
    googleMapsUrl?: string | null;
    operatingHours?: string | null;
  };
  social: {
    instagram?: string | null;
    youtube?: string | null;
    facebook?: string | null;
    xTwitter?: string | null;
    telegram?: string | null;
    tiktok?: string | null;
    linkedin?: string | null;
  };
  announcement: {
    enabled: boolean;
    badge?: string | null;
    text?: string | null;
    linkUrl?: string | null;
    linkLabel?: string | null;
    openInNewTab?: boolean | null;
  };
  footer: {
    copyrightText?: string | null;
    footerDescription?: string | null;
  };
}

/**
 * Fallback static settings when CMS database is uninitialized or unreachable
 */
export const defaultSiteSettings: SiteSettingsData = {
  general: {
    siteName: siteConfig.name,
    tagline: "Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam",
    logoLight: null,
    logoDark: null,
    favicon: null,
  },
  seo: {
    defaultTitle: siteConfig.title,
    defaultDescription: siteConfig.description,
    keywords:
      "sekolah pemikiran islam, spi, kajian islam, tradisi ilmu, peradaban islam",
    defaultOgImage: { url: siteConfig.ogImage },
    locale: siteConfig.locale,
  },
  contact: {
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    whatsapp: "6281234567890",
    address: siteConfig.contact.address,
    googleMapsUrl: null,
    operatingHours: "Senin - Jumat, 09:00 - 17:00 WIB",
  },
  social: {
    instagram: siteConfig.social.instagram,
    youtube: siteConfig.social.youtube,
    facebook: siteConfig.social.facebook,
    xTwitter: siteConfig.social.x,
    telegram: null,
    tiktok: null,
    linkedin: siteConfig.social.linkedin,
  },
  announcement: {
    enabled: false,
    badge: "Pengumuman",
    text: "",
    linkUrl: "",
    linkLabel: "Selengkapnya",
    openInNewTab: false,
  },
  footer: {
    copyrightText: `${siteConfig.name}. All rights reserved.`,
    footerDescription:
      "Sekolah Pemikiran Islam (SPI) adalah wadah kaderisasi intelektual muda Muslim yang menyelenggarakan kajian pemikiran Islam terencana dan terukur.",
  },
};

/**
 * Fetches the site-settings Global from Payload CMS with graceful static fallback
 */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });

    if (!settings) {
      return defaultSiteSettings;
    }

    return {
      general: {
        siteName: settings.general?.siteName || defaultSiteSettings.general.siteName,
        tagline: settings.general?.tagline || defaultSiteSettings.general.tagline,
        logoLight: (settings.general?.logoLight as { url?: string; alt?: string }) || null,
        logoDark: (settings.general?.logoDark as { url?: string; alt?: string }) || null,
        favicon: (settings.general?.favicon as { url?: string }) || null,
      },
      seo: {
        defaultTitle: settings.seo?.defaultTitle || defaultSiteSettings.seo.defaultTitle,
        defaultDescription:
          settings.seo?.defaultDescription || defaultSiteSettings.seo.defaultDescription,
        keywords: settings.seo?.keywords || defaultSiteSettings.seo.keywords,
        defaultOgImage: (settings.seo?.defaultOgImage as { url?: string }) || defaultSiteSettings.seo.defaultOgImage,
        locale: settings.seo?.locale || defaultSiteSettings.seo.locale,
      },
      contact: {
        email: settings.contact?.email || defaultSiteSettings.contact.email,
        phone: settings.contact?.phone || defaultSiteSettings.contact.phone,
        whatsapp: settings.contact?.whatsapp || defaultSiteSettings.contact.whatsapp,
        address: settings.contact?.address || defaultSiteSettings.contact.address,
        googleMapsUrl: settings.contact?.googleMapsUrl || null,
        operatingHours:
          settings.contact?.operatingHours || defaultSiteSettings.contact.operatingHours,
      },
      social: {
        instagram: settings.social?.instagram || defaultSiteSettings.social.instagram,
        youtube: settings.social?.youtube || defaultSiteSettings.social.youtube,
        facebook: settings.social?.facebook || defaultSiteSettings.social.facebook,
        xTwitter: settings.social?.xTwitter || defaultSiteSettings.social.xTwitter,
        telegram: settings.social?.telegram || null,
        tiktok: settings.social?.tiktok || null,
        linkedin: settings.social?.linkedin || defaultSiteSettings.social.linkedin,
      },
      announcement: {
        enabled: Boolean(settings.announcement?.enabled),
        badge: settings.announcement?.badge || defaultSiteSettings.announcement.badge,
        text: settings.announcement?.text || null,
        linkUrl: settings.announcement?.linkUrl || null,
        linkLabel: settings.announcement?.linkLabel || defaultSiteSettings.announcement.linkLabel,
        openInNewTab: Boolean(settings.announcement?.openInNewTab),
      },
      footer: {
        copyrightText:
          settings.footer?.copyrightText || defaultSiteSettings.footer.copyrightText,
        footerDescription:
          settings.footer?.footerDescription || defaultSiteSettings.footer.footerDescription,
      },
    };
  } catch (err) {
    console.warn("Payload getSiteSettings failed, using static fallback:", err);
    return defaultSiteSettings;
  }
}
