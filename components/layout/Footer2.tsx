import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import home2footerfooterBg21 from "@/public/assets/imgs/home2/footer/footer-bg2_1.webp";
import logofooter2Logo from "@/public/assets/imgs/logo/footer2-logo.svg";
import ToastForm from "@/components/forms/ToastForm";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Iconf2ef33ce from "@/icons/Iconf2ef33ce";
import MailIcon from "@/icons/MailIcon";
import PhoneIcon from "@/icons/PhoneIcon";

const Footer2 = () => {
  return (
    <footer className="footer2 site-footer">
      <div className="footer2__bg">
        <Image
          src={home2footerfooterBg21}
          alt=""
        />
      </div>
      <div className="container">
        <div className="footer2__top">
          <div className="footer2__top-left">
            {/* Quick Links */}
            <div className="footer2__widget fade-anim">
              <h3 className="footer2__widget-title">Quick Links</h3>
              <ul className="footer2__links">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/courses-v2">Courses</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/blog-three-column">Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="footer2__widget fade-anim" data-delay="0.15">
              <h3 className="footer2__widget-title">Popular Categories</h3>
              <ul className="footer2__links">
                <li>
                  <Link href="/course-details-classic-v2">
                    Professional skills
                  </Link>
                </li>
                <li>
                  <Link href="/course-details-classic-v2">
                    Business & finance
                  </Link>
                </li>
                <li>
                  <Link href="/course-details-classic-v2">AI Technology</Link>
                </li>
                <li>
                  <Link href="/course-details-classic-v2">UI/UX Design</Link>
                </li>
                <li>
                  <Link href="/course-details-classic-v2">Programing</Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer2__widget fade-anim" data-delay="0.30">
              <h3 className="footer2__widget-title">Support</h3>
              <ul className="footer2__links">
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <a href="#">Help center</a>
                </li>
                <li>
                  <a href="#">Terms & conditions</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <Link href="/contact">Feedback</Link>
                </li>
              </ul>
            </div>

            {/* Social Link */}
            <div className="footer2__widget fade-anim" data-delay="0.45">
              <h3 className="footer2__widget-title">Social Link</h3>
              <ul className="footer2__links">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
                <li>
                  <a href="#">Twitter/X</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer2__top-right">
            {/* Newsletter */}
            <div className="footer2__newsletter fade-anim" data-delay="0.60">
              <h3 className="footer2__widget-title">Sign Up For Newsletter</h3>
              <ToastForm
                className="footer2__form"
                successMessage="Thanks! You're subscribed to our newsletter."
              >
                <div className="footer2__input-wrap">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address.."
                    required
                  />
                  <span className="icon">
                    <Iconf2ef33ce />
                  </span>
                </div>

                <button type="submit" className="theme-btn button-bg-orange">
                  <span className="text">Sign up</span>
                  <span className="icon">
                    <ArrowOutwardIcon fill="#1A453B" />
                  </span>
                </button>
              </ToastForm>
            </div>
          </div>
        </div>

        <div className="footer2__divider"></div>

        <div className="footer2__branding py-60">
          <div className="row align-items-center d-flex justify-content-between g-4">
            <div className="col-lg-6 col-xl-8 fade-anim">
              <div className="footer2__logo">
                <Link href="/">
                  <Image src={logofooter2Logo} alt={siteConfig.name} />
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="footer2__info">
                <p className="footer2__desc">
                  We help learners discover courses gain skills, and achieve.
                </p>
                <div className="footer2__contact">
                  <div className="item">
                    <PhoneIcon fill="white" />

                    <a href="tel:+14151234567">+1 (415) 123-4567</a>
                  </div>
                  <div className="item">
                    <MailIcon fill="white" />

                    <a href="mailto:support@instituteflow.com">support@instituteflow.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer2__bottom-divider"></div>
        <div className="footer2__bottom text-center">
          <p className="copyright text-center">
            ©2026 <span>{siteConfig.name}.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
