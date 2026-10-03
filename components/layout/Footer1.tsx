import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import type { SiteSettingsData } from "@/lib/getSiteSettings";
import Image from "next/image";
import ToastForm from "@/components/forms/ToastForm";
import home1footerfooterBgPattern from "@/public/assets/imgs/home1/footer/footer-bg-pattern.webp";
import logofooterLogoWhite from "@/public/assets/imgs/logo/logo-spi/logo-cpz.png";
import home1footerfooterPlay from "@/public/assets/imgs/home1/footer/footer-play.svg";
import home1footerfooterApple from "@/public/assets/imgs/home1/footer/footer-apple.svg";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Icon8b40015b from "@/icons/Icon8b40015b";
import Icon8e464795 from "@/icons/Icon8e464795";
import Iconf2ef33ce from "@/icons/Iconf2ef33ce";
import MailIcon from "@/icons/MailIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import ThreadsIcon from "@/icons/ThreadsIcon";
import XIcon from "@/icons/XIcon";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/Sekolah.Pemikiran.Islam", icon: <Icon8b40015b /> },
  { label: "Instagram", href: "https://www.instagram.com/spi.indonesia/", icon: <i className="fa-brands fa-instagram"></i> },
  { label: "YouTube", href: "https://www.youtube.com/@SekolahPemikiranIslam", icon: <Icon8e464795 /> },
  { label: "Threads", href: "https://www.threads.com/@spi.indonesia", icon: <ThreadsIcon /> },
  { label: "X/Twitter", href: "https://x.com/MarkazSPI", icon: <XIcon /> },
];

const Footer1 = ({ className = "", settings }: { className?: string; settings?: SiteSettingsData }) => {
  const contactPhone = settings?.contact?.phone || "+62 812-8557-4547";
  const contactEmail = settings?.contact?.email || "markaz.spi@gmail.com";
  const whatsappUrl = settings?.contact?.whatsapp
    ? settings.contact.whatsapp.startsWith("http")
      ? settings.contact.whatsapp
      : `https://wa.me/${settings.contact.whatsapp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/6281285574547";
  const footerDesc =
    settings?.footer?.footerDescription ||
    "Lembaga pendidikan nonformal yang menghadirkan kajian tematik berbasis pemikiran Islam, sejarah, dan peradaban.";
  const copyright = settings?.footer?.copyrightText || `${siteConfig.name}. All rights reserved.`;

  return (
    <footer className={`footer1 site-footer${className ? ` ${className}` : ""}`}>
      <div className="footer1__bg">
        <Image src={home1footerfooterBgPattern} alt="" />
      </div>
      <div className="container">
        <div className="footer1__top">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 fade-anim">
              <h2 className="footer1__title word-anim">
                Get the latest <span>programs,</span> <br />
                updates, and learning news
              </h2>
            </div>
            <div className="col-lg-5 fade-anim" data-delay="0.30">
              <div className="footer1__newsletter">
                <p className="footer1__newsletter-label">Sign Up For Newsletter</p>
                <ToastForm
                  className="footer1__form"
                  successMessage="Thanks! You're subscribed to our newsletter."
                >
                  <div className="footer1__input-wrap">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address..."
                      required
                    />
                    <span className="icon">
                      <Iconf2ef33ce />
                    </span>
                  </div>
                  <button type="submit" className="theme-btn">
                    <span className="text">Sign Up</span>
                    <span className="icon">
                      <ArrowOutwardIcon fill="#0065B5" />
                    </span>
                  </button>
                </ToastForm>
              </div>
            </div>
          </div>
        </div>

        <div className="footer1__main">
          {/* Brand */}
          <div className="footer1__widget">
            <div className="footer1__logo mb-30">
              <Link href="/">
                <Image src={logofooterLogoWhite} alt={settings?.general?.siteName || siteConfig.name} />
              </Link>
            </div>
            <p className="footer1__desc">{footerDesc}</p>
            <div className="footer1__contact">
              <div className="footer1__contact-item">
                <PhoneIcon fill="white" />
                <a href={`tel:${contactPhone.replace(/\s+/g, "")}`}>{contactPhone}</a>
              </div>
              <div className="footer1__contact-item">
                <MailIcon fill="white" />
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer1__widget">
            <h3 className="footer1__widget-title">Quick Links</h3>
            <ul className="footer1__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-v1">Profile</Link></li>
              <li><Link href="/courses-v1">Program &amp; Kelas</Link></li>
              <li><Link href="/blog-three-column">Media</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer1__widget">
            <h3 className="footer1__widget-title">Program Kami</h3>
            <ul className="footer1__links">
              <li><Link href="/kursus-singkat">Kursus Singkat</Link></li>
              <li><Link href="/komik-intensif">KOMIK Intensif</Link></li>
              <li><Link href="/tuesdays-special">Tuesday&apos;s Special</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer1__widget">
            <h3 className="footer1__widget-title">Kontak</h3>
            <ul className="footer1__links">
              <li><Link href="/contact">Hubungi Kami</Link></li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li><a href={`mailto:${contactEmail}`}>Email</a></li>
            </ul>
          </div>

          {/* App Download */}
          <div className="footer1__widget footer1__widget--app">
            <h3 className="footer1__widget-title">Download Our Learning App</h3>
            <div className="footer1__app-btns">
              <a href="#" className="app-btn">
                <Image src={home1footerfooterPlay} alt="Google Play" />
              </a>
              <a href="#" className="app-btn">
                <Image src={home1footerfooterApple} alt="App Store" />
              </a>
            </div>
          </div>

        </div>
        

        <div className="footer1__bottom">
          <p className="copyright">
            ©2026<span> {settings?.general?.siteName || siteConfig.name}.</span> {copyright.replace(/^.*\. All rights reserved\./, "All rights reserved.")}
          </p>
          <div className="footer1__social text-center text-md-end">
            {socials.map((social) => (
              <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer">
                {social.icon}
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
