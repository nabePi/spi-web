import SideToggle from "@/components/layout/SideToggle";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import logoDefault from "@/public/assets/imgs/logo/logo.svg";
import logoWhite from "@/public/assets/imgs/logo/logo-white.svg";
import logoBlue from "@/public/assets/imgs/logo/logo-blue.svg";
import logoBlue2 from "@/public/assets/imgs/logo/logo-blue2.svg";
import logoGreen from "@/public/assets/imgs/logo/logo-green.svg";
import logoOrange from "@/public/assets/imgs/logo/logo-orange.svg";
import logoTan from "@/public/assets/imgs/logo/logo-tan.svg";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Icon2c7c9c59 from "@/icons/Icon2c7c9c59";
import MailIcon from "@/icons/MailIcon";
import PhoneIcon from "@/icons/PhoneIcon";

type NavBadge = "hot" | "new" | "new2" | "hot2";

interface NavItem {
  label: string;
  href?: string;
  badge?: NavBadge;
  children?: NavItem[];
}

/**
 * Primary navigation — the eight top-level sections of the approved sitemap.
 * TODO(route): only "/" exists today; the rest arrive in later steps and 404
 * until then. Paths follow PRD §17.4 so no rework is needed when they land.
 */
const mainMenu: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang Kami",
    children: [
      { label: "Sekilas SPI", href: "/tentang-kami" },
      { label: "Pendiri", href: "/tentang-kami/pendiri" },
      { label: "Sejarah & Pencapaian", href: "/tentang-kami/sejarah" },
      { label: "Filosofi Dasar: Konsep Adab", href: "/tentang-kami/filosofi-adab" },
      { label: "Visi & Misi", href: "/tentang-kami/visi-misi" },
    ],
  },
  {
    label: "Program",
    children: [
      { label: "Semua Program", href: "/program" },
      { label: "Jadwal Terkini", href: "/program/jadwal" },
    ],
  },
  { label: "Cabang", href: "/cabang" },
  {
    label: "Berita & Artikel",
    children: [
      { label: "Berita Terkini", href: "/berita" },
      { label: "Kisah Alumni", href: "/kisah-alumni" },
      { label: "Liputan Media", href: "/liputan-media" },
    ],
  },
  {
    label: "Sumber Daya",
    children: [
      { label: "Publikasi", href: "/publikasi" },
      { label: "FAQ", href: "/faq" },
      { label: "Unduhan", href: "/unduhan" },
    ],
  },
  {
    label: "Pendaftaran",
    children: [
      { label: "Panduan Pendaftaran", href: "/pendaftaran" },
      { label: "Kontak Pendaftaran", href: "/pendaftaran/kontak" },
    ],
  },
  { label: "Kontak", href: "/kontak" },
];

function badgeClass(badge?: NavBadge): string {
  switch (badge) {
    case "hot":
      return "badge-hot";
    case "new":
      return "badge-new";
    case "new2":
      return "badge-new badge-new2";
    case "hot2":
      return "badge-hot badge-hot2";
    default:
      return "";
  }
}

function badgeLabel(badge: NavBadge): string {
  switch (badge) {
    case "hot":
    case "hot2":
      return "Hot";
    case "new":
    case "new2":
      return "New";
    default:
      return "";
  }
}


interface NavLinkProps {
  href: string;
  badge?: NavBadge;
  children: React.ReactNode;
}

function NavLink({ href, badge, children }: NavLinkProps) {
  const content = (
    <>
      {children}
      {badge ? (
        <span className={badgeClass(badge)}>{badgeLabel(badge)}</span>
      ) : null}
    </>
  );

  if (
    href.startsWith("/") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return <Link href={href}>{content}</Link>;
  }

  return <a href={href}>{content}</a>;
}

function NavDropdownItem({ item }: { item: NavItem }) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <li className={hasChildren ? "menu-item-has-children" : undefined}>
      {item.href ? (
        <NavLink href={item.href} badge={item.badge}>
          {item.label}
        </NavLink>
      ) : (
        <a href="#">{item.label}</a>
      )}
      {hasChildren ? (
        <ul>
          {item.children!.map((child) => (
            <NavDropdownItem key={child.label} item={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
}

function NavDropdown({ label, items }: NavDropdownProps) {
  return (
    <li className="menu-item-has-children">
      <a href="#">{label}</a>
      <ul className="dp-menu">
        {items.map((item) => (
          <NavDropdownItem key={item.label} item={item} />
        ))}
      </ul>
    </li>
  );
}

function MainNav() {
  return (
    <nav className="main-menu" style={{ display: "block" }}>
      <ul>
        {mainMenu.map((item) =>
          item.children ? (
            <NavDropdown key={item.label} label={item.label} items={item.children} />
          ) : (
            <li key={item.label}>
              <NavLink href={item.href!}>{item.label}</NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function HeaderTop({ variant }: { variant: HeaderVariant }) {
  const useMatIcons = variant === "area2-seven" || variant === "area2-seven-inner";
  const iconFill = useMatIcons ? "currentColor" : "white";
  return (
    <div className="header-top d-none d-lg-block">
      <div className="container">
        <div className="header-top__inner">
          <div className="header-top__left">
            <div className="header-top__left-item">
              <a href={`mailto:${siteConfig.contact.email}`}>
                {useMatIcons ? (
                  <span className="material-icons-outlined">mail</span>
                ) : (
                  <MailIcon fill={iconFill} />
                )}
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="header-top__left-item">
              <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}>
                {useMatIcons ? (
                  <span className="material-icons-outlined">call</span>
                ) : (
                  <PhoneIcon fill={iconFill} />
                )}
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          <p className="header-top__offer">
            Kelas SPI <span>gratis</span> — terbuka untuk umum
          </p>
        </div>
      </div>
    </div>
  );
}

export type HeaderVariant =
  | "default"
  | "inner"
  | "marketplace"
  | "area2"
  | "area2-seven"
  | "area2-seven-inner"
  | "area2-eight"
  | "area2-nine"
  | "area2-ten"
  | "six-style"
  | "border-bottom";

export type HeaderCta =
  | {
      kind: "theme-btn";
      href: string;
      label: string;
      modifierClass?: string;
    }
  | {
      kind: "btn-two";
      href: string;
      label: string;
      styleVariant?: string;
    };

function HeaderCtaButton({ cta }: { cta: HeaderCta }) {
  if (cta.kind === "btn-two") {
    const className = cta.styleVariant
      ? `btn-two ${cta.styleVariant} d-none d-sm-inline-flex`
      : "btn-two d-none d-sm-inline-flex";
    return (
      <Link href={cta.href} className={className}>
        <span className="btn-text">{cta.label}</span>
        <span className="btn-icon">
          <span className="material-symbols-sharp">arrow_outward</span>
        </span>
      </Link>
    );
  }

  const className = cta.modifierClass
    ? `theme-btn ${cta.modifierClass}`
    : "theme-btn";
  return (
    <Link href={cta.href} className={className}>
      <span className="text">{cta.label}</span>
      <span className="icon">
        <ArrowOutwardIcon fill="#1A453B" />
      </span>
    </Link>
  );
}

function headerClassName(variant: HeaderVariant): string {
  const classes: string[] = [];
  if (variant === "area2" || variant.startsWith("area2-")) {
    classes.push("header-area-2");
    if (variant === "area2-seven" || variant === "area2-seven-inner") classes.push("header-seven-style");
    if (variant === "area2-seven-inner") classes.push("header-inner");
    if (variant === "area2-eight") classes.push("header-eight-style");
    if (variant === "area2-nine") classes.push("header-nine-style");
    if (variant === "area2-ten") classes.push("header-ten-style");
  } else {
    classes.push("header-area-1");
    if (variant === "inner") classes.push("header-inner");
    if (variant === "six-style") classes.push("header-six-style");
    if (variant === "border-bottom") classes.push("border-bottom");
  }
  return classes.join(" ");
}

function headerInnerClassName(variant: HeaderVariant): string {
  if (variant === "area2" || variant.startsWith("area2-")) return "header-area-2-inner";
  if (variant === "six-style") return "header-area-1-inner header-six-style-inner";
  return "header-area-1-inner";
}

function headerLogoSrc(variant: HeaderVariant): StaticImageData {
  switch (variant) {
    case "area2":
      return logoWhite;
    case "area2-seven":
    case "area2-seven-inner":
      return logoBlue2;
    case "area2-eight":
      return logoGreen;
    case "area2-nine":
      return logoOrange;
    case "area2-ten":
      return logoTan;
    case "six-style":
      return logoBlue;
    default:
      return logoDefault;
  }
}

function SideToggleIcon({ variant }: { variant: HeaderVariant }) {
  if (variant === "border-bottom" || variant === "six-style") {
    return (
      <Icon2c7c9c59 />
    );
  }

  return (
    <span
      className={
        variant === "area2"
          ? "material-symbols-outlined text-white"
          : "material-symbols-outlined"
      }
    >
      menu
    </span>
  );
}

function navInHeaderRight(variant: HeaderVariant): boolean {
  return (
    variant === "area2" ||
    variant === "marketplace" ||
    variant === "area2-eight" ||
    variant === "area2-nine" ||
    variant === "area2-ten" ||
    variant === "border-bottom" ||
    variant === "six-style"
    // area2-seven and area2-seven-inner: nav in left section
  );
}

function HeaderMain({
  variant,
  cta,
  logoSrc: logoSrcOverride,
}: {
  variant: HeaderVariant;
  cta?: HeaderCta;
  logoSrc?: StaticImageData;
}) {
  const innerClass = headerInnerClassName(variant);
  const logoSrc = logoSrcOverride ?? headerLogoSrc(variant);
  const navInRight = navInHeaderRight(variant);
  return (
    <div className="header-main header-sticky">
      <div className="container">
        <div className={innerClass}>
          <div className="left">
            <div className="header-logo">
              <Link href="/">
                <Image
                  src={logoSrc}
                  className="normal-logo"
                  alt={siteConfig.name}
                />
              </Link>
            </div>
            {!navInRight ? (
              <div className="header-nav">
                <MainNav />
              </div>
            ) : null}
          </div>

          <div className="header-right">
            {navInRight ? (
              <div className="header-nav">
                <MainNav />
              </div>
            ) : null}

            {cta ? (
              <div className="header-button d-none d-xl-flex">
                <HeaderCtaButton cta={cta} />
              </div>
            ) : null}

            {(variant === "border-bottom" || variant === "six-style") ? (
              <div className={variant === "six-style" ? "header-offcanvas d-xl-none" : "header-offcanvas"}>
                <SideToggle>
                  <SideToggleIcon variant={variant} />
                </SideToggle>
              </div>
            ) : null}
          </div>

          {variant !== "border-bottom" && variant !== "six-style" ? (
            <div className="header-offcanvas d-xl-none">
              <SideToggle>
                <SideToggleIcon variant={variant} />
              </SideToggle>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Header({
  variant = "default",
  cta,
  logoSrc,
  showHeaderTop = true,
}: {
  variant?: HeaderVariant;
  cta?: HeaderCta;
  logoSrc?: StaticImageData;
  showHeaderTop?: boolean;
}) {
  return (
    <header className={headerClassName(variant)}>
      {showHeaderTop ? <HeaderTop variant={variant} /> : null}
      <HeaderMain
        variant={variant}
        cta={cta}
        logoSrc={logoSrc}
      />
    </header>
  );
}
