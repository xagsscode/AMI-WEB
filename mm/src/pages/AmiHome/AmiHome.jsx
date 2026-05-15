import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    FaUserTie, FaLock, FaSearch,
    FaHome, FaBuilding, FaTree, FaStore,
    FaArrowRight, FaStar, FaCheckCircle, FaMapMarkerAlt,
    FaCity, FaHandshake, FaShieldAlt, FaLeaf,
} from "react-icons/fa";
import { MdVerified, MdApartment, MdVilla, MdLocationCity } from "react-icons/md";
import { BsBuildings, BsHouseDoor } from "react-icons/bs";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import SearchBar from "../../components/SearchBar";
import PropertyCard from "../../components/PropertyCard";
import ceoImage from "../../assets/Image/Abdulmumin Musa Isa.jpeg";
import mukhtarImg from "../../assets/Image/Mukhtar Dili.jpeg";
import abdullahiImg from "../../assets/Image/Abdullahi Sabo.jpeg";
import hauwaImg from "../../assets/Image/Hauwa M Alibaba.jpeg";
import umarImg from "../../assets/Image/Umar Abida Nuhu.PNG";
import haleemahImg from "../../assets/Image/Haleemah Adedoyin.jpeg";
import graceImg from "../../assets/Image/Grace Emmanuel.jpeg";
import "./AmiHome.css";

/* ── Scroll animation hook ── */
const useScrollReveal = () => {
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            }),
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        document.querySelectorAll(".ami-fade-up").forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
};

/* ── Static data ── */
const CATEGORIES = [
    { icon: <FaHome />, label: "Houses", type: "house", count: "Premium Duplexes" },
    { icon: <MdApartment />, label: "Apartments", type: "apartment", count: "Modern Flats" },
    { icon: <FaTree />, label: "Land", type: "land", count: "Serviced Plots" },
    { icon: <FaStore />, label: "Commercial", type: "commercial", count: "Investment Units" },
];

const SERVICES = [
    {
        icon: <BsBuildings />,
        title: "Property Development",
        desc: "We design and deliver premium residential estates with modern infrastructure, smart amenities, and quality finishes built to last.",
    },
    {
        icon: <FaLeaf />,
        title: "Site & Service Solutions",
        desc: "Fully serviced plots with roads, drainage, electricity, and water — ready for you to build your dream home on your terms.",
    },
    {
        icon: <FaHome />,
        title: "Smart Homes",
        desc: "Fibre-connected, tech-enabled homes designed for modern living — from smart security to energy-efficient infrastructure.",
    },
    {
        icon: <MdVilla />,
        title: "Luxury Housing",
        desc: "Exclusive gated communities and high-end residences crafted for comfort, elegance, and a premium lifestyle.",
    },
    {
        icon: <FaHandshake />,
        title: "Property Investment",
        desc: "Transparent, rewarding investment opportunities in high-growth locations across Abuja and Kano with strong ROI potential.",
    },
    {
        icon: <FaCity />,
        title: "Land Acquisition",
        desc: "We source, verify, and secure prime land in strategic locations — making land ownership simple, safe, and stress-free.",
    },
];

const PROJECTS = [
    {
        id: "victory-park",
        name: "Victory Park Resort",
        location: "Gwarinpa Extension, Abuja",
        desc: "A premium residential estate designed for comfort, security, and modern living — featuring recreational areas, schools, shopping facilities, and landscaped surroundings.",
        types: ["Sansiro Emirate Maisonette — 500 SQM", "Etihad Fully Detached Duplex — 400 SQM", "Ferragamo Terrace Duplex — 250 SQM"],
        tag: "Abuja",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    {
        id: "ami-residence-kubwa",
        name: "AMI Residence",
        location: "Kubwa, Abuja",
        desc: "A thoughtfully planned gated community featuring contemporary homes, landscaped greenery, private driveways, and palm-lined roads for serene modern living.",
        types: ["Semi Detached Duplex — 250 SQM", "Fully Detached Duplex — 500 SQM"],
        tag: "Abuja",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    },
    {
        id: "ami-residence-kano",
        name: "AMI Residence",
        location: "Bompai, Kano",
        desc: "A boutique residential development on President Avenue, Bompai — designed for modern comfort with spacious apartments, quality finishes, and natural ventilation.",
        types: ["3 Bedroom Apartment Flats"],
        tag: "Kano",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
];

const WHY_ITEMS = [
    {
        icon: <MdVerified />,
        title: "Transparency You Can Trust",
        desc: "Every development is backed by clear documentation, verified titles, and full legal support — no hidden surprises.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Quality Without Compromise",
        desc: "From foundation to finishing, we use premium materials and modern construction standards on every project.",
    },
    {
        icon: <FaHandshake />,
        title: "Hassle-Free Ownership",
        desc: "We handle the complexity so you don't have to — from land acquisition to title documentation and handover.",
    },
    {
        icon: <FaCity />,
        title: "Smart Community Living",
        desc: "Our estates are designed as complete communities — with infrastructure, amenities, and connectivity built in.",
    },
];

const TESTIMONIALS = [
    {
        name: "Amina Bello",
        role: "Homeowner, Abuja",
        comment: "AMI Smart Homes delivered exactly what they promised. The quality of finishing at Victory Park is exceptional — I couldn't be happier with my investment.",
        rating: 5,
        initials: "AB",
    },
    {
        name: "Chukwuemeka Obi",
        role: "Property Investor, Lagos",
        comment: "I've invested in several developments across Nigeria, but AMI stands out for their transparency and professionalism. The ROI has been outstanding.",
        rating: 5,
        initials: "CO",
    },
    {
        name: "Fatima Yusuf",
        role: "Resident, Kano",
        comment: "The AMI Residence in Bompai exceeded my expectations. Modern design, great location, and a team that genuinely cares about client satisfaction.",
        rating: 5,
        initials: "FY",
    },
];

const STATS = [
    { value: "3+", label: "Active Estates" },
    { value: "500+", label: "Happy Families" },
    { value: "2", label: "Cities Covered" },
    { value: "100%", label: "Verified Titles" },
];

/* ── Component ── */
const AmiHome = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");

    useScrollReveal();

    const handleSearch = (filters) => {
        const params = new URLSearchParams();
        if (filters.location) params.set("location", filters.location);
        if (filters.type !== "all") params.set("type", filters.type);
        if (filters.priceRange !== "all") params.set("price", filters.priceRange);
        params.set("status", filters.status);
        navigate(`/properties?${params.toString()}`);
    };

    return (
        <div className="ami-page ami-home">
            <AmiNavbar />

            {/* ── HERO ── */}
            <section className="ami-hero">
                <div className="ami-hero__overlay" />
                <div className="ami-container ami-hero__content">
                    <div className="ami-badge ami-hero__badge">
                        <FaCheckCircle /> Premium Real Estate Development · Abuja &amp; Kano
                    </div>
                    <h1 className="ami-hero__title">
                        Creating Homes,<br />
                        <span className="ami-gold-text">Building Wealth</span>
                    </h1>
                    <p className="ami-hero__subtitle">
                        AMI Smart Homes &amp; Properties Ltd delivers premium residential estates,
                        smart homes, and investment-grade developments across Nigeria's fastest-growing cities.
                    </p>
                    <div className="ami-hero__cta-row">
                        <button className="ami-btn-primary ami-hero__cta-btn" onClick={() => navigate("/properties")}>
                            Explore Our Projects <FaArrowRight />
                        </button>
                        <button className="ami-btn-ghost ami-hero__cta-btn" onClick={() => navigate("/contact")}>
                            Schedule a Consultation
                        </button>
                    </div>
                    <div className="ami-hero__stats">
                        {STATS.map((s) => (
                            <div key={s.label} className="ami-hero__stat">
                                <span className="ami-hero__stat-value">{s.value}</span>
                                <span className="ami-hero__stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT US ── */}
            <section className="ami-section ami-about" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-about__inner">
                        <div className="ami-about__left ami-fade-up">
                            <div className="ami-badge">About AMI Smart Homes</div>
                            <h2 className="ami-section-title" style={{ marginTop: 12 }}>
                                Nigeria's Premier Smart<br />Real Estate Developer
                            </h2>
                            <div className="ami-divider" />
                            <p className="ami-about__text">
                                AMI Smart Homes &amp; Properties Ltd is a forward-thinking real estate development
                                company committed to delivering well-planned sites, premium residential estates,
                                and smart living communities across Nigeria.
                            </p>
                            <p className="ami-about__text">
                                We combine innovation, quality craftsmanship, and deep market expertise to create
                                homes that are not just beautiful — but built to appreciate in value. From land
                                acquisition to infrastructure development and gated community living, we make
                                property ownership transparent, rewarding, and truly hassle-free.
                            </p>
                            <div className="ami-about__pillars">
                                {["Innovation", "Quality", "Transparency", "Affordability"].map((p) => (
                                    <span key={p} className="ami-about__pillar"><FaCheckCircle /> {p}</span>
                                ))}
                            </div>
                            <button className="ami-btn-primary" style={{ marginTop: 28 }} onClick={() => navigate("/about")}>
                                Our Story <FaArrowRight />
                            </button>
                        </div>
                        <div className="ami-about__right ami-fade-up">
                            <div className="ami-about__mission-card">
                                <div className="ami-about__mission-icon"><FaHome /></div>
                                <h4>Our Mission</h4>
                                <p>To deliver well-planned sites and premium property developments that combine quality, affordability, and innovation — making property ownership hassle-free, transparent, and rewarding.</p>
                            </div>
                            <div className="ami-about__vision-card">
                                <div className="ami-about__vision-icon"><FaCity /></div>
                                <h4>Our Vision</h4>
                                <p>To become one of Nigeria's leading smart real estate and property development companies — known for innovation, trust, and modern community living.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="ami-section ami-services">
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>What We Do</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>Our Core Services</h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                        <p className="ami-section-subtitle" style={{ maxWidth: 560, margin: "0 auto" }}>
                            From land acquisition to smart home delivery — we cover every stage of the property journey.
                        </p>
                    </div>
                    <div className="ami-services__grid ami-fade-up">
                        {SERVICES.map((s) => (
                            <div key={s.title} className="ami-service-card">
                                <div className="ami-service-card__icon">{s.icon}</div>
                                <h3 className="ami-service-card__title">{s.title}</h3>
                                <p className="ami-service-card__desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROJECTS ── */}
            <section className="ami-section ami-projects" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up">
                        <div className="ami-badge">Our Developments</div>
                        <div className="ami-featured__header-row">
                            <div>
                                <h2 className="ami-section-title" style={{ marginTop: 12 }}>Featured Estates &amp; Projects</h2>
                                <div className="ami-divider" />
                            </div>
                            <Link to="/properties" className="ami-btn-outline ami-featured__view-all">
                                View All <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                    <div className="ami-projects__grid ami-fade-up">
                        {PROJECTS.map((proj) => (
                            <div key={proj.id} className="ami-project-card">
                                <div className="ami-project-card__img-wrap">
                                    <img src={proj.image} alt={proj.name} className="ami-project-card__img" loading="lazy" />
                                    <span className="ami-project-card__location-tag">
                                        <FaMapMarkerAlt /> {proj.tag}
                                    </span>
                                </div>
                                <div className="ami-project-card__body">
                                    <h3 className="ami-project-card__name">{proj.name}</h3>
                                    <div className="ami-project-card__loc">
                                        <FaMapMarkerAlt /> {proj.location}
                                    </div>
                                    <p className="ami-project-card__desc">{proj.desc}</p>
                                    <div className="ami-project-card__types">
                                        {proj.types.map((t) => (
                                            <span key={t} className="ami-project-card__type">{t}</span>
                                        ))}
                                    </div>
                                    <button className="ami-btn-outline ami-project-card__cta" onClick={() => navigate("/contact")}>
                                        Enquire Now <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="ami-section ami-categories">
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up">
                        <div className="ami-badge">Browse by Type</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>
                            Explore Property Categories
                        </h2>
                        <div className="ami-divider" />
                    </div>
                    <div className="ami-categories__grid ami-fade-up">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.type}
                                className={`ami-category-card ${activeCategory === cat.type ? "active" : ""}`}
                                onClick={() => {
                                    setActiveCategory(cat.type);
                                    navigate(`/properties?type=${cat.type}`);
                                }}
                            >
                                <div className="ami-category-card__icon">{cat.icon}</div>
                                <div className="ami-category-card__label">{cat.label}</div>
                                <div className="ami-category-card__count">{cat.count}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE AMI ── */}
            <section className="ami-section ami-why" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-why__inner">
                        <div className="ami-why__left ami-fade-up">
                            <div className="ami-badge">Why Choose AMI</div>
                            <h2 className="ami-section-title" style={{ marginTop: 12 }}>
                                Built on Trust.<br />Driven by Excellence.
                            </h2>
                            <div className="ami-divider" />
                            <p className="ami-section-subtitle">
                                We don't just build properties — we build communities, create wealth, and
                                deliver on every promise we make to our clients and investors.
                            </p>
                            <button className="ami-btn-primary" style={{ marginTop: 28 }} onClick={() => navigate("/contact")}>
                                Talk to Us <FaArrowRight />
                            </button>
                        </div>
                        <div className="ami-why__right ami-fade-up">
                            {WHY_ITEMS.map((item) => (
                                <div key={item.title} className="ami-why-card">
                                    <div className="ami-why-card__icon">{item.icon}</div>
                                    <div>
                                        <h4 className="ami-why-card__title">{item.title}</h4>
                                        <p className="ami-why-card__desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TEAM ── */}
            <section className="ami-section ami-team">
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>Our People</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>Meet the Leadership Team</h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                        <p className="ami-section-subtitle" style={{ maxWidth: 560, margin: "0 auto" }}>
                            A dedicated team of real estate professionals committed to delivering excellence,
                            transparency, and value on every project.
                        </p>
                    </div>

                    {/* CEO */}
                    <div className="ami-team__ceo ami-fade-up">
                        <div className="ami-team__ceo-avatar-wrap">
                            <div className="ami-team__ceo-ring" />
                            <img
                                src={ceoImage}
                                alt="Abdulmumin Musa Isa"
                                className="ami-team__ceo-avatar"
                                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
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

                    {/* Staff grid */}
                    <div className="ami-team__grid ami-fade-up">
                        {TEAM_MEMBERS.map((member) => (
                            <div key={member.name} className="ami-team__card">
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
                                <p className="ami-team__card-desc">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="ami-section ami-testimonials" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>Client Stories</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>
                            What Our Clients Say
                        </h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                    </div>
                    <div className="ami-testimonials__grid ami-fade-up">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="ami-testimonial-card">
                                <div className="ami-stars">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <p className="ami-testimonial-card__comment">&ldquo;{t.comment}&rdquo;</p>
                                <div className="ami-testimonial-card__author">
                                    <div className="ami-testimonial-card__avatar">{t.initials}</div>
                                    <div>
                                        <div className="ami-testimonial-card__name">{t.name}</div>
                                        <div className="ami-testimonial-card__role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="ami-cta">
                <div className="ami-container ami-cta__inner">
                    <div className="ami-cta__text ami-fade-up">
                        <h2 className="ami-cta__title">
                            Ready to Own a Premium Property?
                        </h2>
                        <p className="ami-cta__subtitle">
                            Whether you're buying your first home, investing in real estate, or looking for
                            a serviced plot — AMI Smart Homes has the right solution for you.
                        </p>
                    </div>
                    <div className="ami-cta__actions ami-fade-up">
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

/* ── Team data ── */
const TEAM_MEMBERS = [
    {
        name: "Mukhtar Dili",
        role: "Deputy Managing Director",
        initials: "MD",
        image: mukhtarImg,
        desc: "Supports executive leadership and oversees day-to-day operations across all AMI developments and business units.",
    },
    {
        name: "Abdullahi Sabo",
        role: "Executive Director",
        initials: "AS",
        image: abdullahiImg,
        desc: "Drives strategic growth, project execution, and stakeholder relationships across AMI's portfolio of estates.",
    },
    {
        name: "Hauwa M Alibaba",
        role: "Content & Communications Lead",
        initials: "HA",
        image: hauwaImg,
        desc: "Shapes AMI's brand voice and manages all communications, ensuring clarity and consistency across every channel.",
    },
    {
        name: "Umar Abida Nuhu",
        role: "Public Relations & Media Lead",
        initials: "UN",
        image: umarImg,
        desc: "Manages AMI's public image, media relations, and outreach to build trust and visibility in the market.",
    },
    {
        name: "Haleemah Adedoyin",
        role: "Secretary",
        initials: "HA",
        image: haleemahImg,
        desc: "Coordinates executive schedules, correspondence, and administrative operations with precision and professionalism.",
    },
    {
        name: "Grace Emmanuel",
        role: "Corporate Affairs Officer",
        initials: "GE",
        image: graceImg,
        desc: "Handles regulatory compliance, corporate governance, and liaison with government and institutional bodies.",
    },
];

/* ── Demo data (shown when Firebase has no properties yet) ── */
const DEMO_PROPERTIES = [
    {
        id: "demo-1",
        title: "Luxury 4-Bedroom Duplex",
        price: 85000000,
        location: "Maitama, Abuja",
        type: "house",
        status: "sale",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"],
        bedrooms: 4,
        bathrooms: 3,
        area: 320,
        featured: true,
    },
    {
        id: "demo-2",
        title: "Modern 3-Bedroom Apartment",
        price: 2500000,
        location: "Lekki Phase 1, Lagos",
        type: "apartment",
        status: "rent",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"],
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        featured: true,
    },
    {
        id: "demo-3",
        title: "Prime Commercial Land",
        price: 45000000,
        location: "Wuse 2, Abuja",
        type: "land",
        status: "sale",
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"],
        bedrooms: null,
        bathrooms: null,
        area: 1200,
        featured: false,
    },
    {
        id: "demo-4",
        title: "Executive 5-Bedroom Villa",
        price: 250000000,
        location: "Banana Island, Lagos",
        type: "house",
        status: "sale",
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80"],
        bedrooms: 5,
        bathrooms: 5,
        area: 600,
        featured: true,
    },
    {
        id: "demo-5",
        title: "Cozy 2-Bedroom Flat",
        price: 1200000,
        location: "GRA, Port Harcourt",
        type: "apartment",
        status: "rent",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"],
        bedrooms: 2,
        bathrooms: 1,
        area: 110,
        featured: false,
    },
    {
        id: "demo-6",
        title: "Office Complex",
        price: 120000000,
        location: "Victoria Island, Lagos",
        type: "commercial",
        status: "sale",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"],
        bedrooms: null,
        bathrooms: 4,
        area: 850,
        featured: false,
    },
];

export default AmiHome;

