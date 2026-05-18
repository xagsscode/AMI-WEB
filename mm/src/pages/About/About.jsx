import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowRight, FaCheckCircle, FaHandshake,
    FaCity, FaShieldAlt, FaLeaf, FaHome,
    FaMapMarkerAlt, FaEnvelope,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import ceoImage from "../../assets/Image/Abdulmumin Musa Isa.jpeg";
import cofounderImage from "../../assets/Image/Hajiya Bikisu Ibrahim Bako.jpeg";
import mukhtarImg from "../../assets/Image/Mukhtar Dili.jpeg";
import abdullahiImg from "../../assets/Image/Abdullahi Sabo.jpeg";
import hauwaImg from "../../assets/Image/Hauwa M Alibaba.jpeg";
import umarImg from "../../assets/Image/Umar Abida Nuhu.PNG";
import haleemahImg from "../../assets/Image/Haleemah Adedoyin.jpeg";
import graceImg from "../../assets/Image/Grace Emmanuel.jpeg";
import "./About.css";

const useScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("animate-in");
            }),
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
};

const VALUES = [
    {
        icon: <FaCheckCircle />,
        title: "Transparency",
        description: "Every transaction, title, and development is backed by clear documentation and honest communication — no hidden surprises.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Quality",
        description: "From foundation to finishing, we use premium materials and modern construction standards on every project we deliver.",
    },
    {
        icon: <FaLeaf />,
        title: "Innovation",
        description: "We embrace smart home technology, modern infrastructure, and forward-thinking design to create communities built for the future.",
    },
    {
        icon: <FaHandshake />,
        title: "Affordability",
        description: "Premium living shouldn't be out of reach. We structure our developments to offer genuine value at every price point.",
    },
];

const TEAM = [
    { name: "Mukhtar Dili", role: "Deputy Managing Director", initials: "MD", image: mukhtarImg },
    { name: "Abdullahi Sabo", role: "Executive Director", initials: "AS", image: abdullahiImg },
    { name: "Hauwa M Alibaba", role: "Content & Communications Lead", initials: "HA", image: hauwaImg },
    { name: "Umar Abida Nuhu", role: "Public Relations & Media Lead", initials: "UN", image: umarImg },
    { name: "Haleemah Adedoyin", role: "Secretary", initials: "HA", image: haleemahImg },
    { name: "Grace Emmanuel", role: "Corporate Affairs Officer", initials: "GE", image: graceImg },
];

const STATS = [
    { value: "3+", label: "Active Estates" },
    { value: "500+", label: "Happy Families" },
    { value: "2", label: "Cities Covered" },
    { value: "100%", label: "Verified Titles" },
];

const About = () => {
    const navigate = useNavigate();
    useScrollAnimation();

    return (
        <div className="ami-page ami-about-page">
            <AmiNavbar />

            {/* ── HERO ── */}
            <section className="ami-about-hero">
                <div className="ami-about-hero__overlay" />
                <div className="ami-container ami-about-hero__content">
                    <div className="ami-badge ami-about-hero__badge scroll-animate">
                        <MdVerified /> About AMI Smart Homes
                    </div>
                    <h1 className="ami-about-hero__title scroll-animate">
                        Building Nigeria's<br />
                        <span className="ami-gold-text">Premium Future</span>
                    </h1>
                    <p className="ami-about-hero__sub scroll-animate">
                        We are a forward-thinking real estate development company committed to delivering
                        smart homes, premium estates, and rewarding investment opportunities across Nigeria.
                    </p>
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section className="ami-section ami-about-story">
                <div className="ami-container">
                    <div className="ami-about-story__grid">
                        <div className="ami-about-story__content scroll-animate">
                            <div className="ami-badge">Our Story</div>
                            <h2 className="ami-section-title" style={{ marginTop: 12 }}>
                                From a Vision to Nigeria's<br />Trusted Developer
                            </h2>
                            <div className="ami-divider" />
                            <div className="ami-about-story__text">
                                <p>
                                    AMI Smart Homes &amp; Properties Ltd was founded on a simple but powerful belief —
                                    that every Nigerian deserves access to quality, affordable, and well-planned
                                    living spaces. What began as a vision to transform how Nigerians experience
                                    property ownership has grown into a company delivering premium residential
                                    estates across Abuja and Kano.
                                </p>
                                <p>
                                    We saw a gap in the market: too many developments that promised luxury but
                                    delivered mediocrity, and too many buyers left without clear titles, proper
                                    infrastructure, or honest communication. AMI was built to change that.
                                </p>
                                <p>
                                    Today, our portfolio spans gated communities, smart residential developments,
                                    serviced plots, and luxury housing — all designed with modern lifestyles in mind
                                    and backed by full legal documentation and transparent processes.
                                </p>
                                <p className="ami-about-story__highlight">
                                    AMI Smart Homes is more than a developer — we are a long-term partner in your
                                    property journey, committed to making ownership hassle-free, transparent, and
                                    truly rewarding.
                                </p>
                            </div>
                        </div>

                        <div className="ami-about-story__visual scroll-animate">
                            <div className="ami-about-stats-card">
                                {STATS.map((s) => (
                                    <div key={s.label} className="ami-about-stat-item">
                                        <div className="ami-about-stat-number">{s.value}</div>
                                        <div className="ami-about-stat-label">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="ami-about-tagline-card">
                                <FaHome className="ami-about-tagline-icon" />
                                <p>"Creating Homes, Building Wealth"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION ── */}
            <section className="ami-section ami-about-mv" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-section-header scroll-animate" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>What Drives Us</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>Mission &amp; Vision</h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                    </div>
                    <div className="ami-about-mv__grid">
                        <div className="ami-about-mv-card scroll-animate">
                            <div className="ami-about-mv-card__icon"><FaCity /></div>
                            <h3>Our Mission</h3>
                            <p>
                                To deliver well-planned sites and premium property developments that combine
                                quality, affordability, and innovation — while making property ownership
                                hassle-free, transparent, and rewarding for every client.
                            </p>
                        </div>
                        <div className="ami-about-mv-card scroll-animate">
                            <div className="ami-about-mv-card__icon"><MdVerified /></div>
                            <h3>Our Vision</h3>
                            <p>
                                To become one of Nigeria's leading smart real estate and property development
                                companies — known for innovation, trust, and modern community living that
                                sets the standard across the nation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="ami-section ami-about-values">
                <div className="ami-container">
                    <div className="ami-section-header scroll-animate" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>Our Values</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>What We Stand For</h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                    </div>
                    <div className="ami-about-values__grid">
                        {VALUES.map((v) => (
                            <div key={v.title} className="ami-about-value-card scroll-animate">
                                <div className="ami-about-value-card__icon">{v.icon}</div>
                                <h3 className="ami-about-value-card__title">{v.title}</h3>
                                <p className="ami-about-value-card__desc">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM ── */}
            <section className="ami-section ami-about-team" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-section-header scroll-animate" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>Our People</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>Meet the Leadership Team</h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                        <p className="ami-section-subtitle" style={{ maxWidth: 560, margin: "0 auto" }}>
                            A dedicated team of professionals committed to delivering excellence,
                            transparency, and value on every project.
                        </p>
                    </div>

                    {/* Founders row */}
                    <div className="ami-team__founders scroll-animate">
                        {/* CEO */}
                        <div className="ami-team__founder-card">
                            <div className="ami-team__founder-avatar-wrap">
                                <div className="ami-team__ceo-ring" />
                                <img
                                    src={ceoImage}
                                    alt="Abdulmumin Musa Isa"
                                    className="ami-team__ceo-avatar"
                                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                                />
                                <div className="ami-team__avatar-fallback" style={{ display: "none" }}>AM</div>
                            </div>
                            <div className="ami-team__ceo-info">
                                <div className="ami-team__ceo-badge">CEO / Managing Director</div>
                                <h3 className="ami-team__ceo-name">Abdulmumin Musa Isa</h3>
                                <p className="ami-team__ceo-desc">
                                    Abdulmumin is the visionary founder and CEO of AMI Smart Homes &amp; Properties Ltd.
                                    With a deep passion for real estate development and an unwavering commitment to
                                    quality and transparency, he built AMI to redefine property ownership in Nigeria.
                                    His leadership drives the company's mission to deliver premium, affordable, and
                                    smart living communities across Abuja, Kano, and beyond.
                                </p>
                            </div>
                        </div>

                        {/* Co-Founder */}
                        <div className="ami-team__founder-card">
                            <div className="ami-team__founder-avatar-wrap">
                                <div className="ami-team__ceo-ring" />
                                <img
                                    src={cofounderImage}
                                    alt="Hajiya Bikisu Ibrahim Bako"
                                    className="ami-team__ceo-avatar"
                                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                                />
                                <div className="ami-team__avatar-fallback" style={{ display: "none" }}>HB</div>
                            </div>
                            <div className="ami-team__ceo-info">
                                <div className="ami-team__ceo-badge">Co-Founder</div>
                                <h3 className="ami-team__ceo-name">Hajiya Bikisu Ibrahim Bako</h3>
                                <p className="ami-team__ceo-desc">
                                    Hajiya Bikisu is the Co-Founder of AMI Smart Homes &amp; Properties Ltd,
                                    bringing visionary leadership, deep community ties, and a strong commitment
                                    to creating dignified, modern living spaces for Nigerian families.
                                    Her dedication to quality and inclusive development is at the heart of
                                    everything AMI builds.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Team grid */}
                    <div className="ami-team__grid scroll-animate">
                        {TEAM.map((member) => (
                            <div key={member.name + member.role} className="ami-team__card">
                                <div className="ami-team__avatar-wrap">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="ami-team__card-photo"
                                            onError={e => {
                                                e.target.style.display = "none";
                                                e.target.nextSibling.style.display = "flex";
                                            }}
                                        />
                                    ) : null}
                                    <div className="ami-team__avatar-placeholder" style={member.image ? { display: "none" } : {}}>
                                        {member.initials}
                                    </div>
                                </div>
                                <div className="ami-team__card-name">{member.name}</div>
                                <div className="ami-team__card-role">{member.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="ami-cta">
                <div className="ami-container ami-cta__inner">
                    <div className="ami-cta__text scroll-animate">
                        <h2 className="ami-cta__title">
                            Ready to Own a Premium Property?
                        </h2>
                        <p className="ami-cta__subtitle">
                            Explore our estates in Abuja and Kano, or get in touch with our team
                            to discuss your investment goals.
                        </p>
                    </div>
                    <div className="ami-cta__actions scroll-animate">
                        <button className="ami-btn-primary ami-cta__btn" onClick={() => navigate("/properties")}>
                            Explore Properties <FaArrowRight />
                        </button>
                        <button className="ami-btn-ghost ami-cta__btn" onClick={() => navigate("/contact")}>
                            Contact Us <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            <AmiFooter />
        </div>
    );
};

export default About;
