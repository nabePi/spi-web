import SideToggle from "@/components/layout/SideToggle";
import ToastForm from "@/components/forms/ToastForm";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import megaMenumegaMenuThumb11 from "@/public/assets/imgs/mega-menu/mega-menu-thumb1_1.webp";
import logoDefault from "@/public/assets/imgs/logo/logo.svg";
import logoWhite from "@/public/assets/imgs/logo/logo-white.svg";
import logoBlue from "@/public/assets/imgs/logo/logo-blue.svg";
import logoBlue2 from "@/public/assets/imgs/logo/logo-blue2.svg";
import logoGreen from "@/public/assets/imgs/logo/logo-green.svg";
import logoOrange from "@/public/assets/imgs/logo/logo-orange.svg";
import logoTan from "@/public/assets/imgs/logo/logo-tan.svg";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import GlobeIcon from "@/icons/GlobeIcon";
import Icon12e7c3d5 from "@/icons/Icon12e7c3d5";
import Icon2c7c9c59 from "@/icons/Icon2c7c9c59";
import Icon53961c91 from "@/icons/Icon53961c91";
import Icon7521078f from "@/icons/Icon7521078f";
import Icon957c3569 from "@/icons/Icon957c3569";
import Icona29835d8 from "@/icons/Icona29835d8";
import Iconb0a02cce from "@/icons/Iconb0a02cce";
import MailIcon from "@/icons/MailIcon";
import PhoneIcon from "@/icons/PhoneIcon";

type NavBadge = "hot" | "new" | "new2" | "hot2";

interface NavItem {
  label: string;
  href?: string;
  badge?: NavBadge;
  children?: NavItem[];
}

const homeMegaMenu: NavItem[] = [
  { label: "Course Platforms", href: "/" },
  { label: "E-Learning Hub", href: "/e-learning", badge: "hot" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Single Instructor", href: "/single-instructor", badge: "new" },
  { label: "Distance Learning", href: "/distant-learning" },
  { label: "Language School", href: "/language-school" },
  { label: "Kindergarten", href: "/kindergarten" },
  { label: "Business Coach", href: "/business-coach", badge: "new2" },
  { label: "Cooking Courses", href: "/cooking-course" },
  { label: "Health Coaching", href: "/health-coaching", badge: "hot2" },
];

const coursesMenu: NavItem[] = [
  { label: "Course classic", href: "/courses-v1" },
  { label: "Course 4 column grid", href: "/courses-v2" },
  { label: "Course 3 column grid", href: "/courses-v3" },
  { label: "Course sidebar left", href: "/courses-sidebar-left" },
  { label: "Course sidebar right", href: "/courses-sidebar-right" },
  {
    label: "Course Details",
    children: [
      { label: "course details classic v1", href: "/course-details-classic-v1" },
      { label: "course details classic v2", href: "/course-details-classic-v2" },
      { label: "course details classic v3", href: "/course-details-classic-v3" },
    ],
  },
  { label: "Kindergarten Course", href: "/kindergarten-course" },
  { label: "Kindergarten Course Details", href: "/kindergarten-course-details" },
];

const instructorsMenu: NavItem[] = [
  { label: "Instructor 01", href: "/instructor-v1" },
  { label: "Instructor 02", href: "/instructor-v2" },
  { label: "Instructor Details", href: "/instructor-details" },
  { label: "Become A Mentor", href: "/become-mentor" },
  { label: "Kindergarten Teacher", href: "/kindergarten-teacher" },
  { label: "Kindergarten Teacher Details", href: "/kindergarten-teacher-details" },
];

const pagesMenu: NavItem[] = [
  {
    label: "About",
    children: [
      { label: "About v1", href: "/about-v1" },
      { label: "Kindergarten About", href: "/kindergarten-about" },
    ],
  },
  {
    label: "Event",
    children: [
      { label: "Event Grid", href: "/event-grid" },
      { label: "Event Details", href: "/event-details" },
    ],
  },
  {
    label: "Shop",
    children: [
      { label: "Shop", href: "/shop" },
      { label: "Shop Details", href: "/shop-details" },
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    label: "FAQ'S",
    children: [
      { label: "FAQ'S", href: "/faq" },
      { label: "Kindergarten FAQ'S", href: "/kindergarten-faq" },
    ],
  },
  {
    label: "Profile",
    children: [
      { label: "Sign Up", href: "/signup" },
      { label: "Sign In", href: "/login" },
      { label: "Profile", href: "/profile" },
    ],
  },
  {
    label: "Contact",
    children: [
      { label: "Contact", href: "/contact" },
      { label: "Kindergarten Contact", href: "/kindergarten-contact" },
    ],
  },
  { label: "Pricing Table", href: "/pricing" },
  {
    label: "404 Page",
    children: [
      { label: "404 Page", href: "/error-404" },
      { label: "Kindergarten 404 Page", href: "/kindergarten-404" },
    ],
  },
];

const blogMenu: NavItem[] = [
  { label: "Blog 2 column grid", href: "/blog-two-column" },
  { label: "Blog 3 column grid", href: "/blog-three-column" },
  { label: "Blog Standard", href: "/blog-standard" },
  {
    label: "Blog Details",
    children: [
      { label: "Blog Details Sidebar Left", href: "/blog-details-leftsidebar" },
      { label: "Blog Details Sidebar Right", href: "/blog-details-rightsidebar" },
      { label: "Blog Details Full Width", href: "/blog-details-standard" },
    ],
  },
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

function MegaMenuBanner() {
  return (
    <div className="mega-menu-home__banner d-none d-xl-flex">
      <div className="mega-menu-home__banner-shape">
        <Icon7521078f />
      </div>
      <div className="banner-content">
        <div className="text">
          Download our <br />
          <span>learning app</span>
        </div>

        <div className="buttons">
          <a href="#">
            <Iconb0a02cce />
          </a>
          <a href="#">
            <Icona29835d8 />
          </a>
        </div>
      </div>
      <div className="banner-image">
        <Image
          src={megaMenumegaMenuThumb11}
          alt="App Mockup"
        />
      </div>
    </div>
  );
}

function MegaMenuColumn({ items }: { items: NavItem[] }) {
  return (
    <div className="mega-menu-home__column">
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <NavLink href={item.href!} badge={item.badge}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomeMegaMenu() {
  const leftColumn = homeMegaMenu.slice(0, 5);
  const rightColumn = homeMegaMenu.slice(5);

  return (
    <li className="menu-item-has-children has-mega-menu">
      <a href="#">Home</a>
      <div className="mega-menu-home d-none d-xl-flex">
        <div className="mega-menu-home__left">
          <MegaMenuColumn items={leftColumn} />
          <MegaMenuColumn items={rightColumn} />
        </div>
        <MegaMenuBanner />
      </div>
      <ul className="dp-menu d-xl-none">
        {homeMegaMenu.map((item) => (
          <li key={item.label}>
            <NavLink href={item.href!} badge={item.badge}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

function MainNav() {
  return (
    <nav className="main-menu" style={{ display: "block" }}>
      <ul>
        <HomeMegaMenu />
        <NavDropdown label="Courses" items={coursesMenu} />
        <NavDropdown label="Instructors" items={instructorsMenu} />
        <NavDropdown label="Pages" items={pagesMenu} />
        <NavDropdown label="Blog" items={blogMenu} />
        <li>
          <NavLink href="/contact">Contact</NavLink>
        </li>
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
              <a href="mailto:support@instituteflow.com">
                {useMatIcons ? (
                  <span className="material-icons-outlined">mail</span>
                ) : (
                  <MailIcon fill={iconFill} />
                )}
                support@instituteflow.com
              </a>
            </div>
            <div className="header-top__left-item">
              <a href="tel:+14155550127">
                {useMatIcons ? (
                  <span className="material-icons-outlined">call</span>
                ) : (
                  <PhoneIcon fill={iconFill} />
                )}
                (415) 555-0127
              </a>
            </div>
          </div>
          <p className="header-top__offer">
            Limited-Time Offer — Get Up To <span>30%</span> Off On Selected
            Courses
          </p>
          <div className="header-top__right">
            <div className="language">
              <a href="#!" className="language__current">
                {useMatIcons ? (
                  <span className="material-icons-sharp">language</span>
                ) : (
                  <GlobeIcon fill={iconFill} />
                )}
                English
              </a>
              <ul className="language__dropdown">
                <li>
                  <a href="#!">English</a>
                </li>
                <li>
                  <a href="#!">Spanish</a>
                </li>
                <li>
                  <a href="#!">French</a>
                </li>
              </ul>
            </div>
            <a href="#!" className="header-top__arabic">
              العربية
            </a>
          </div>
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

function HeaderSearch() {
  return (
    <div className="header-search d-none d-xl-block">
      <ToastForm successMessage="Search submitted.">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          aria-label="Search"
          required
        />
        <button type="submit" aria-label="Search">
          <Icon12e7c3d5 />
        </button>
      </ToastForm>
    </div>
  );
}

function HeaderMain({
  variant,
  cta,
  logoSrc: logoSrcOverride,
  cartBadgeClassName = "header-right__cart-badge",
  showSearch = false,
}: {
  variant: HeaderVariant;
  cta?: HeaderCta;
  logoSrc?: StaticImageData;
  cartBadgeClassName?: string;
  showSearch?: boolean;
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
            {showSearch ? <HeaderSearch /> : null}
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

            <Link
              className="header-right__user d-none d-xl-flex"
              href="/profile"
              aria-label="My account"
            >
              <Icon957c3569 />
            </Link>

            <Link
              className="header-right__cart d-none d-xl-flex"
              href="/cart"
              aria-label="Cart"
            >
              <Icon53961c91 />
              <span className={cartBadgeClassName}>2</span>
            </Link>

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
  cartBadgeClassName,
  showHeaderTop = true,
  showSearch = false,
}: {
  variant?: HeaderVariant;
  cta?: HeaderCta;
  logoSrc?: StaticImageData;
  cartBadgeClassName?: string;
  showHeaderTop?: boolean;
  showSearch?: boolean;
}) {
  return (
    <header className={headerClassName(variant)}>
      {showHeaderTop ? <HeaderTop variant={variant} /> : null}
      <HeaderMain
        variant={variant}
        cta={cta}
        logoSrc={logoSrc}
        cartBadgeClassName={cartBadgeClassName}
        showSearch={showSearch}
      />
    </header>
  );
}
