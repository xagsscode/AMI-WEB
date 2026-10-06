import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope, FaMapMarkerAlt, FaClock,
  FaPaperPlane, FaChevronDown, FaChevronUp,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import "./Contact.css";

const CONTACT_METHODS = [
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    detail: "info@amismarthomes.com",
    note: "We reply within 24 hours",
    href: "mailto:info@amismarthomes.com",
    color: "#C9A96E",
  },

];

const FAQS = [
  {
    q: "How do I list a property on AMI Smart Homes?",
    a: "Sign in and select Sell in the property search bar to submit your property details. Contact our team if you need help preparing your listing.",
  },
  {
    q: "Are all properties on AMI verified?",
    a: "Yes. Every listing goes through our verification process before going live. We confirm ownership documents, property details, and agent credentials to protect buyers and renters.",
  },
  {
    q: "How do I contact an agent about a property?",
    a: "Open a property listing and complete the inquiry form. You can also contact our team by email with the property name and your questions.",
  },
  {
    q: "Is there a fee to search or browse properties?",
    a: "No. Browsing and searching properties on AMI Smart Homes is completely free. Fees only apply to property owners who want to list or feature their properties.",
  },
  {
    q: "How do I report a suspicious listing?",
    a: "Email info@amismarthomes.com with the listing link and your concerns so our team can review it.",
  },
  {
    q: "Can I save properties and compare them?",
    a: "Use the heart icon on a property card to save it in your current browser. Saved selections remain on this device; a comparison view is not currently available.",
  },
];

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`;
    window.location.href = `mailto:info@amismarthomes.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="ami-page ami-contact-page">
      <AmiNavbar />

      {/* Hero */}
      <div className="ami-contact-hero">
        <div className="ami-container">
          <div className="ami-badge ami-contact-hero__badge">
            <MdVerified /> Get in Touch
          </div>
          <h1 className="ami-contact-hero__title">
            We're Here to Help You<br />
            <span className="ami-gold-text">Find Your Property</span>
          </h1>
          <p className="ami-contact-hero__sub">
            Have a question about a listing, need help with your account, or want to list a property?
            Our team is ready to assist.
          </p>
        </div>
      </div>

      {/* Contact methods */}
      <section className="ami-section ami-contact-methods">
        <div className="ami-container">
          <div className="ami-contact-methods__grid">
            {CONTACT_METHODS.map((m) => (
              <a key={m.title} href={m.href} target="_blank" rel="noopener noreferrer" className="ami-contact-method-card">
                <div className="ami-contact-method-card__icon" style={{ background: m.color + "18", color: m.color }}>
                  {m.icon}
                </div>
                <h3 className="ami-contact-method-card__title">{m.title}</h3>
                <p className="ami-contact-method-card__detail">{m.detail}</p>
                <span className="ami-contact-method-card__note">{m.note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Office info */}
      <section className="ami-section ami-contact-main" style={{ background: "var(--off-white)" }}>
        <div className="ami-container">
          <div className="ami-contact-main__grid">

            {/* Form */}
            <div className="ami-contact-form-wrap">
              <h2 className="ami-contact-form-wrap__title">Send Us a Message</h2>
              <p className="ami-contact-form-wrap__sub">Fill in the form to prepare an email to our team.</p>

              {submitted && (
                <div className="ami-contact-success" role="status">
                  Your email draft is ready. Send it from your email app to complete your inquiry.
                </div>
              )}

              <form onSubmit={handleSubmit} className="ami-contact-form">
                <div className="ami-contact-form__row">
                  <div className="ami-contact-form__field">
                    <label htmlFor="c-name">Full Name *</label>
                    <input id="c-name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="ami-contact-form__field">
                    <label htmlFor="c-email">Email Address *</label>
                    <input id="c-email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="ami-contact-form__row">
                  <div className="ami-contact-form__field">
                    <label htmlFor="c-phone">Phone Number</label>
                    <input id="c-phone" name="phone" type="tel" placeholder="+234 xxx xxx xxxx" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="ami-contact-form__field">
                    <label htmlFor="c-subject">Subject *</label>
                    <input id="c-subject" name="subject" type="text" placeholder="How can we help?" value={formData.subject} onChange={handleChange} required />
                  </div>
                </div>

                <div className="ami-contact-form__field">
                  <label htmlFor="c-message">Message *</label>
                  <textarea id="c-message" name="message" rows={5} placeholder="Tell us more about your inquiry..." value={formData.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="ami-btn-primary ami-contact-form__submit">
                  <FaPaperPlane /> Prepare Email
                </button>
              </form>
            </div>

            {/* Office info */}
            <div className="ami-contact-info">
              <div className="ami-contact-info__card">
                <h3 className="ami-contact-info__title">Our Office</h3>
                <div className="ami-contact-info__items">
                  <div className="ami-contact-info__item">
                    <div className="ami-contact-info__item-icon"><FaMapMarkerAlt /></div>
                    <div>
                      <strong>AMI Smart Homes HQ</strong>
                      <p>Abuja &amp; Kano, Nigeria</p>
                    </div>
                  </div>
                  <div className="ami-contact-info__item">
                    <div className="ami-contact-info__item-icon"><FaClock /></div>
                    <div>
                      <strong>Business Hours</strong>
                      <p>Mon – Fri: 9:00 AM – 6:00 PM WAT<br />Saturday: 10:00 AM – 2:00 PM WAT<br />Sunday: Closed</p>
                    </div>
                  </div>
                  <div className="ami-contact-info__item">
                    <div className="ami-contact-info__item-icon"><FaEnvelope /></div>
                    <div>
                      <strong>Email</strong>
                      <p>info@amismarthomes.com</p>
                    </div>
                  </div>
                </div>


              </div>

              {/* CTA card */}
              <div className="ami-contact-cta-card">
                <h4>Ready to find your property?</h4>
                <p>Explore our properties and find a home that fits your plans.</p>
                <button className="ami-btn-primary" onClick={() => navigate("/properties")}>
                  Browse Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ami-section ami-contact-faq">
        <div className="ami-container">
          <div className="ami-contact-faq__header">
            <div className="ami-badge">FAQ</div>
            <h2 className="ami-section-title" style={{ marginTop: 12 }}>Frequently Asked Questions</h2>
            <div className="ami-divider" />
          </div>
          <div className="ami-contact-faq__list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`ami-faq-item ${openFaq === i ? "open" : ""}`}>
                <button
                  className="ami-faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openFaq === i && (
                  <div className="ami-faq-item__answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AmiFooter />
    </div>
  );
};

export default Contact;
