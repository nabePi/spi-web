"use client";

import { useEffect } from "react";
import Image from "next/image";
import innerbreadcumbbreadcumbBgPattern3 from "@/public/assets/imgs/inner/breadcumb/breadcumb-bg-pattern3.png";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
                5<span>0</span>0
              </h1>
              <p className="error-page__desc">Oops! Something went wrong</p>
              <button type="button" className="btn-two v9" onClick={reset}>
                <span className="btn-text">Try again</span>
                <span className="btn-icon">
                  <span className="material-symbols-sharp">refresh</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
