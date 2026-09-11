import ToastForm from "@/components/forms/ToastForm";
import { contactContent } from "@/content/inner/contact";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import CheckIcon from "@/icons/CheckIcon";
import Icon477a2778 from "@/icons/Icon477a2778";
import Icon5c7cdbd0 from "@/icons/Icon5c7cdbd0";
import Iconb2d73122 from "@/icons/Iconb2d73122";
import Iconfc979fda from "@/icons/Iconfc979fda";
import SectionBooksIcon from "@/icons/SectionBooksIcon";
import StudentsIcon9901 from "@/icons/StudentsIcon9901";

const GetInTouchSection = () => {
  const { subtitle, titleBefore, titleMid, titleHighlight, info, form } = contactContent;
  return (
    <section className="getintouch1 fade-anim">
      <div className="container">
        <div className="getintouch1__wrap section-padding">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="getintouch1__content-left">
                <div className="section-top text-start mb-30">
                  <span className="section-top__subtitle">
                    <SectionBooksIcon />
                    {subtitle}
                  </span>
                  <h2 className="section-top__title">
                    {titleBefore} <br />
                    {titleMid}
                    <span>{titleHighlight}</span>
                  </h2>
                </div>

                <div className="getintouch1__info-list">
                  <div
                    className="getintouch1__info-item d-flex align-items-center"
                  >
                    <div
                      className="getintouch1__info-icon getintouch1__info-icon--orange"
                    >
                      <Iconb2d73122 />
                    </div>
                    <div className="getintouch1__info-text">
                      <span>{info[0].label}</span>
                      <a href={info[0].href}>{info[0].value}</a>
                    </div>
                  </div>
                  <div
                    className="getintouch1__info-item d-flex align-items-center"
                  >
                    <div
                      className="getintouch1__info-icon getintouch1__info-icon--green"
                    >
                      <Icon5c7cdbd0 />
                    </div>
                    <div className="getintouch1__info-text">
                      <span>{info[1].label}</span>
                      <p>{info[1].value}</p>
                    </div>
                  </div>
                  <div
                    className="getintouch1__info-item d-flex align-items-center"
                  >
                    <div
                      className="getintouch1__info-icon getintouch1__info-icon--orange"
                    >
                      <Icon5c7cdbd0 />
                    </div>
                    <div className="getintouch1__info-text">
                      <span>{info[2].label}</span>
                      <p>{info[2].value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="getintouch1__form-card">
                <ToastForm successMessage="Pesan terkirim. Kami akan segera menghubungi Anda.">
                  <div className="row gx-20 gy-25">
                    <div className="col-sm-6">
                      <div className="getintouch1__input-group">
                        <label>{form.fullName.label}</label>
                        <div className="getintouch1__input-field">
                          <input
                            type="text"
                            name="fullName"
                            placeholder={form.fullName.placeholder}
                            required
                          />
                          <span className="icon">
                            <StudentsIcon9901 />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="getintouch1__input-group">
                        <label>{form.lastName.label}</label>
                        <div className="getintouch1__input-field">
                          <input
                            type="text"
                            name="lastName"
                            placeholder={form.lastName.placeholder}
                            required
                          />
                          <span className="icon">
                            <StudentsIcon9901 />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="getintouch1__input-group">
                        <label>{form.email.label}</label>
                        <div className="getintouch1__input-field">
                          <input
                            type="email"
                            name="email"
                            placeholder={form.email.placeholder}
                            required
                          />
                          <span className="icon"
                            ><Icon477a2778 />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="getintouch1__input-group">
                        <label>{form.phone.label}</label>
                        <div className="getintouch1__input-field">
                          <input
                            type="tel"
                            name="phone"
                            placeholder={form.phone.placeholder}
                            required
                          />
                          <span className="icon"
                            ><Iconfc979fda />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="getintouch1__input-group">
                        <label>{form.subject.label}</label>
                        <div className="getintouch1__input-field">
                          <select className="nice-select" name="subject" required>
                            {form.subject.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="getintouch1__input-group">
                        <label>{form.message.label}</label>
                        <div className="getintouch1__input-field">
                          <textarea
                            name="message"
                            placeholder={form.message.placeholder}
                            required
                          ></textarea>
                          <span className="icon"
                            ><CheckIcon />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="theme-btn w-100">
                        <span className="text">{form.submit}</span>
                        <span className="icon">
                          <ArrowOutwardIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </ToastForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
