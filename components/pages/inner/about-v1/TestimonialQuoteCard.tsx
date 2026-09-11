import type { AboutV1TestimonialQuote } from "@/types/inner/about-v1";
import Image from "next/image";
import Icon4b6dd657 from "@/icons/Icon4b6dd657";
import Icon6c04299e from "@/icons/Icon6c04299e";
import Icon9b45a496 from "@/icons/Icon9b45a496";
import Iconfd0663d3 from "@/icons/Iconfd0663d3";
import StarAltIcon from "@/icons/StarAltIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";

const fullStar = (
  <StarFiveIcon />
);

const halfStar = (
  <StarAltIcon />
);

const CompanyMark = ({ company }: { company: AboutV1TestimonialQuote["company"] }) => {
  if (company === "zoom") {
    return (
      <Icon9b45a496 />
    );
  }
  if (company === "paypal") {
    return (
      <Icon6c04299e />
    );
  }
  if (company === "webflow") {
    return (
      <Icon4b6dd657 />
    );
  }
  return (
    <Iconfd0663d3 />
  );
};

const TestimonialQuoteCard = ({ card }: { card: AboutV1TestimonialQuote }) => {
  return (
    <div className="col-md-6 col-lg-4 fade-anim" data-delay={card.delay}>
      <div className="testimonial1__card">
        <div className="testimonial1__rating">
          <span>{card.rating}</span>
          <div className="stars">
            {fullStar}
            {fullStar}
            {fullStar}
            {fullStar}
            {halfStar}
          </div>
        </div>
        <p className="testimonial1__desc">{card.quote}</p>
        <div className="testimonial1__author-box">
          <div className="testimonial1__author">
            <div className="testimonial1__author-img">
              <Image src={card.author.src} alt={card.author.alt} />
            </div>
            <div className="testimonial1__author-info">
              <div className="name">{card.authorName}</div>
              <span className="designation">{card.designation}</span>
            </div>
          </div>
          <div className="testimonial1__company">
            <CompanyMark company={card.company} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialQuoteCard;
