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
import "./plugins.css";
import "./scss/style.scss";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  icons: { icon: "/assets/imgs/favicon.webp" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    locale: siteConfig.locale,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

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
