import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import innerbreadcumbbreadcumbBgPattern3 from "@/public/assets/imgs/inner/breadcumb/breadcumb-bg-pattern3.png";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

const NotFound = () => {
  return (
    <section className="error-page position-relative">
      <div className="error-page__bg">
        <Image
          src={innerbreadcumbbreadcumbBgPattern3}
          alt=""
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="error-page__content text-center">
              <h1 className="error-page__title">
                4<span>0</span>4
              </h1>
              <p className="error-page__desc">Oop! Page not found</p>
              <Link className="btn-two v9" href="/">
                <span className="btn-text">Back to home</span>
                <span className="btn-icon">
                  <span className="material-symbols-sharp">arrow_outward</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default NotFound;
