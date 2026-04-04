import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    FaUserTie, FaLock, FaSearch,
    FaHome, FaBuilding, FaTree, FaStore,
    FaArrowRight, FaStar, FaCheckCircle, FaMapMarkerAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import SearchBar from "../../components/SearchBar";
import PropertyCard from "../../components/PropertyCard";
import ceoImage from "../../assets/Image/ceo.png";
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
    { icon: <FaHome />, label: "Houses", type: "house", count: "120+ listings" },
    { icon: <FaBuilding />, label: "Apartments", type: "apartment", count: "85+ listings" },
    { icon: <FaTree />, label: "Land", type: "land", count: "60+ listings" },
    { icon: <FaStore />, label: "Commercial", type: "commercial", count: "40+ listings" },
];

const WHY_ITEMS = [
    {
        icon: <MdVerified />,
        title: "Verified Listings",
        desc: "Every property is verified by our team before going live. No fake listings, ever.",
    },
    {
        icon: <FaUserTie />,
        title: "Trusted Agents",
        desc: "Work with certified, background-checked agents who know the Nigerian market.",
    },
    {
        icon: <FaLock />,
        title: "Secure Transactions",
        desc: "Escrow-backed payments and legal documentation support for every deal.",
    },
    {
        icon: <FaSearch />,
        title: "Easy Property Search",
        desc: "Powerful filters to find exactly what you need — by location, price, or type.",
    },
];

const TESTIMONIALS = [
    {
        name: "Amina Bello",
        role: "Homeowner, Abuja",
        comment: "AMI Smart Homes made finding my dream apartment in Abuja so seamless. The listings were accurate and the agent was professional.",
        rating: 5,
        initials: "AB",
    },
    {
        name: "Chukwuemeka Obi",
        role: "Property Investor, Lagos",
        comment: "I've used several platforms but AMI stands out. The verified listings saved me from scams and I closed two deals in a month.",
        rating: 5,
        initials: "CO",
    },
    {
        name: "Fatima Yusuf",
        role: "Tenant, Port Harcourt",
        comment: "Renting through AMI was stress-free. The search filters are excellent and the team was responsive throughout the process.",
        rating: 5,
        initials: "FY",
    },
];

const STATS = [
    { value: "5,000+", label: "Properties Listed" },
    { value: "3,200+", label: "Happy Clients" },
    { value: "120+", label: "Verified Agents" },
    { value: "18", label: "States Covered" },
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
                        <FaCheckCircle /> Nigeria&apos;s #1 Verified Property Platform
                    </div>
                    <h1 className="ami-hero__title">
                        Find Your Dream<br />
                        <span className="ami-gold-text">Property in Nigeria</span>
                    </h1>
                    <p className="ami-hero__subtitle">
                        Buy, rent, or invest in verified properties with AMI Homes.
                        Trusted by thousands of Nigerians.
                    </p>
                    <div className="ami-hero__search">
                        <SearchBar onSearch={handleSearch} />
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

            {/* ── ABOUT US / TEAM ── */}
            <section className="ami-section ami-team" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>Our People</div>
                        <h2 className="ami-section-title" style={{ marginTop: 12 }}>Meet the Team</h2>
                        <div className="ami-divider" style={{ margin: "16px auto" }} />
                        <p className="ami-section-subtitle" style={{ maxWidth: 560, margin: "0 auto" }}>
                            Behind AMI Smart Homes is a passionate team dedicated to making property
                            ownership accessible and trustworthy for every Nigerian.
                        </p>
                    </div>

                    {/* CEO */}
                    <div className="ami-team__ceo ami-fade-up">
                        <div className="ami-team__ceo-avatar-wrap">
                            <div className="ami-team__ceo-ring" />
                            <img
                                src={ceoImage}
                                alt="Abdulmumin Musa Isah"
                                className="ami-team__ceo-avatar"
                                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                            />
                            <div className="ami-team__avatar-fallback" style={{ display: "none" }}>AM</div>
                        </div>
                        <div className="ami-team__ceo-info">
                            <div className="ami-team__ceo-badge">Founder & CEO</div>
                            <h3 className="ami-team__ceo-name">Abdulmumin Musa Isah</h3>
                            <p className="ami-team__ceo-desc">
                                Abdulmumin is the visionary founder of AMI Smart Homes & Properties Ltd.
                                With a deep passion for real estate and a commitment to transparency,
                                he built AMI to bridge the gap between property seekers and verified listings
                                across Nigeria. His leadership drives the company's mission to make
                                homeownership a reality for every Nigerian family.
                            </p>
                        </div>
                    </div>

                    {/* Staff grid */}
                    <div className="ami-team__grid ami-fade-up">
                        {TEAM_MEMBERS.map((member) => (
                            <div key={member.name} className="ami-team__card">
                                <div className="ami-team__avatar-wrap">
                                    <div className="ami-team__avatar-placeholder">
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

            {/* ── WHY CHOOSE AMI ── */}
            <section className="ami-section ami-why">
                <div className="ami-container">
                    <div className="ami-why__inner">
                        <div className="ami-why__left ami-fade-up">
                            <div className="ami-badge">Why AMI Homes</div>
                            <h2 className="ami-section-title" style={{ marginTop: 12 }}>
                                The Smarter Way to Find Property
                            </h2>
                            <div className="ami-divider" />
                            <p className="ami-section-subtitle">
                                We combine technology with local expertise to give you the most reliable
                                property experience in Nigeria.
                            </p>
                            <button className="ami-btn-primary" style={{ marginTop: 28 }} onClick={() => navigate("/properties")}>
                                Browse Properties <FaArrowRight />
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

            {/* ── LATEST LISTINGS ── */}
            <section className="ami-section ami-latest" style={{ background: "var(--off-white)" }}>
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up">
                        <div className="ami-badge">Just Added</div>
                        <div className="ami-featured__header-row">
                            <div>
                                <h2 className="ami-section-title" style={{ marginTop: 12 }}>Latest Listings</h2>
                                <div className="ami-divider" />
                            </div>
                            <Link to="/properties" className="ami-btn-outline ami-featured__view-all">
                                See All <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                    <div className="ami-latest__layout ami-fade-up">
                        <div className="ami-latest__cards">
                            {DEMO_PROPERTIES.slice(0, 4).map((p) => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                        <div className="ami-latest__map">
                            <div className="ami-map-placeholder">
                                <FaMapMarkerAlt className="ami-map-placeholder__icon" />
                                <p>Interactive map coming soon</p>
                                <span>Properties will be pinned on the map</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="ami-section ami-testimonials">
                <div className="ami-container">
                    <div className="ami-section-header ami-fade-up" style={{ textAlign: "center" }}>
                        <div className="ami-badge" style={{ margin: "0 auto" }}>Client Reviews</div>
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
                            Looking to buy or list a property?
                        </h2>
                        <p className="ami-cta__subtitle">
                            Join thousands of Nigerians who trust AMI Smart Homes for their property needs.
                        </p>
                    </div>
                    <div className="ami-cta__actions ami-fade-up">
                        <button className="ami-btn-primary ami-cta__btn" onClick={() => navigate("/properties")}>
                            Browse Properties <FaArrowRight />
                        </button>
                        <button className="ami-btn-ghost ami-cta__btn" onClick={() => navigate("/signup")}>
                            List Property <FaArrowRight />
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
        name: "Aisha Musa",
        role: "Head of Sales",
        initials: "AM",
        desc: "Leads our sales team with over 7 years of real estate experience across Abuja and Lagos.",
    },
    {
        name: "Emeka Okafor",
        role: "Property Consultant",
        initials: "EO",
        desc: "Specialises in commercial and investment properties, helping clients maximise returns.",
    },
    {
        name: "Fatima Aliyu",
        role: "Client Relations",
        initials: "FA",
        desc: "Ensures every client has a smooth, stress-free experience from inquiry to closing.",
    },
    {
        name: "Ibrahim Suleiman",
        role: "Legal & Documentation",
        initials: "IS",
        desc: "Handles all property documentation, title verification, and legal due diligence.",
    },
    {
        name: "Ngozi Adeyemi",
        role: "Marketing Manager",
        initials: "NA",
        desc: "Drives AMI's brand presence and connects buyers with the right listings.",
    },
    {
        name: "Yusuf Garba",
        role: "Field Agent",
        initials: "YG",
        desc: "On-ground property inspection and verification across the FCT and surrounding states.",
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

