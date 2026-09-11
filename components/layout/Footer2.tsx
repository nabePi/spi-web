import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import home2footerfooterBg21 from "@/public/assets/imgs/home2/footer/footer-bg2_1.webp";
import logofooter2Logo from "@/public/assets/imgs/logo/footer2-logo.svg";
import MailIcon from "@/icons/MailIcon";
import PhoneIcon from "@/icons/PhoneIcon";

// TODO(route): links below follow PRD §17.4; only "/" exists today.
const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Program", href: "/program" },
  { label: "Cabang", href: "/cabang" },
  { label: "Kontak", href: "/kontak" },
];

const programLinks = [
  { label: "Semua Program", href: "/program" },
  { label: "Jadwal Terkini", href: "/program/jadwal" },
  { label: "Panduan Pendaftaran", href: "/pendaftaran" },
  { label: "Kontak Pendaftaran", href: "/pendaftaran/kontak" },
];

const resourceLinks = [
  { label: "Publikasi", href: "/publikasi" },
  { label: "FAQ", href: "/faq" },
  { label: "Unduhan", href: "/unduhan" },
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
];

// Verified real accounts — PRD Appendix B
const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "Twitter/X", href: siteConfig.social.x },
  { label: "Medium", href: siteConfig.social.medium },
];

const Footer2 = () => {
  return (
    <footer className="footer2 site-footer">
      <div className="footer2__bg">
        <Image src={home2footerfooterBg21} alt="" />
      </div>
      <div className="container">
        <div className="footer2__top">
          <div className="footer2__top-left">
            <div className="footer2__widget fade-anim">
              <h3 className="footer2__widget-title">Tautan Cepat</h3>
              <ul className="footer2__links">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer2__widget fade-anim" data-delay="0.15">
              <h3 className="footer2__widget-title">Program</h3>
              <ul className="footer2__links">
                {programLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer2__widget fade-anim" data-delay="0.30">
              <h3 className="footer2__widget-title">Sumber Daya</h3>
              <ul className="footer2__links">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer2__widget fade-anim" data-delay="0.45">
              <h3 className="footer2__widget-title">Media Sosial</h3>
              <ul className="footer2__links">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer2__divider"></div>

        <div className="footer2__branding py-60">
          <div className="row align-items-center d-flex justify-content-between g-4">
            <div className="col-lg-6 col-xl-8 fade-anim">
              <div className="footer2__logo">
                <Link href="/">
                  {/* TODO(brand): replace with the SPI logo — PRD W-T5 */}
                  <Image src={logofooter2Logo} alt={siteConfig.name} />
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="footer2__info">
                <p className="footer2__desc">
                  Menghidupkan tradisi ilmu untuk kejayaan peradaban Islam.
                </p>
                <div className="footer2__contact">
                  <div className="item">
                    <PhoneIcon fill="white" />

                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div className="item">
                    <MailIcon fill="white" />

                    <a href={`mailto:${siteConfig.contact.email}`}>
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer2__bottom-divider"></div>
        <div className="footer2__bottom text-center">
          <p className="copyright text-center">
            ©2026 <span>{siteConfig.name}.</span> Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
