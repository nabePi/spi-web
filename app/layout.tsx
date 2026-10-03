import type { Metadata, Viewport } from "next";
import Preloader from "@/components/layout/Preloader";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SideInfo from "@/components/layout/SideInfo";
import { TemplateScripts } from "@/components/layout/TemplateScripts";
import AppProviders from "@/context/AppProviders";
import GlobalVideoModal from "@/components/layout/GlobalVideoModal";
import SiteToaster from "@/components/layout/SiteToaster";
import { fontVariables } from "@/components/layout/fonts";
import { siteConfig } from "@/lib/siteConfig";
import { getSiteSettings } from "@/lib/getSiteSettings";
import "./plugins.css";
import "./scss/style.scss";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = siteConfig.url;
  const siteName = settings.general.siteName || siteConfig.name;
  const siteTitle = settings.seo.defaultTitle || siteConfig.title;
  const siteDesc = settings.seo.defaultDescription || siteConfig.description;
  const ogImg = settings.seo.defaultOgImage?.url || siteConfig.ogImage;
  const favicon = settings.general.favicon?.url || "/assets/imgs/favicon.webp";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s | ${siteName}`,
    },
    description: siteDesc,
    applicationName: siteName,
    authors: [{ name: siteName }],
    icons: { icon: favicon },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: siteName,
      title: siteTitle,
      description: siteDesc,
      url: "/",
      locale: settings.seo.locale || siteConfig.locale,
      images: [{ url: ogImg, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDesc,
      images: [ogImg],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0065b5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone&display=swap"
        />
      </head>
      <body className="body-wrapper" suppressHydrationWarning>
        <AppProviders>
          <Preloader />
          <ScrollToTop />
          <SideInfo />
          {children}
          <GlobalVideoModal />
          <SiteToaster />
          <TemplateScripts />
        </AppProviders>
      </body>
    </html>
  );
}
