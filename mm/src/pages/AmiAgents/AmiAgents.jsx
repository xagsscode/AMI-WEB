import { useState, useEffect } from "react";
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHome, FaSearch } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import "./AmiAgents.css";

/* Demo agents — replace with Firestore fetch when agents collection is ready */
const DEMO_AGENTS = [
    {
        id: "1",
        name: "Emeka Okafor",
        title: "Senior Property Consultant",
        location: "Lagos, Nigeria",
        phone: "+234 801 234 5678",
        email: "emeka@amismarthomes.ng",
        rating: 4.9,
        reviews: 87,
        listings: 34,
        sold: 120,
        specialties: ["Luxury Homes", "Commercial", "Lekki"],
        initials: "EO",
        color: "#C9A96E",
        verified: true,
    },
    {
        id: "2",
        name: "Aisha Bello",
        title: "Residential Property Expert",
        location: "Abuja, Nigeria",
        phone: "+234 802 345 6789",
        email: "aisha@amismarthomes.ng",
        rating: 4.8,
        reviews: 64,
        listings: 28,
        sold: 95,
        specialties: ["Apartments", "Maitama", "Wuse"],
        initials: "AB",
        color: "#8B5CF6",
        verified: true,
    },
    {
        id: "3",
        name: "Chidi Nwosu",
        title: "Land & Investment Specialist",
        location: "Port Harcourt, Nigeria",
        phone: "+234 803 456 7890",
        email: "chidi@amismarthomes.ng",
        rating: 4.7,
        reviews: 52,
        listings: 19,
        sold: 78,
        specialties: ["Land", "Investment", "GRA"],
        initials: "CN",
        color: "#10B981",
        verified: true,
    },
    {
        id: "4",
        name: "Fatima Yusuf",
        title: "Rental Property Specialist",
        location: "Kano, Nigeria",
        phone: "+234 804 567 8901",
        email: "fatima@amismarthomes.ng",
        rating: 4.9,
        reviews: 41,
        listings: 22,
        sold: 60,
        specialties: ["Rentals", "Apartments", "Nasarawa"],
        initials: "FY",
        color: "#EF4444",
        verified: true,
    },
    {
        id: "5",
        name: "Tunde Adeyemi",
        title: "Commercial Real Estate Agent",
        location: "Lagos, Nigeria",
        phone: "+234 805 678 9012",
        email: "tunde@amismarthomes.ng",
        rating: 4.6,
        reviews: 38,
        listings: 15,
        sold: 55,
        specialties: ["Commercial", "Victoria Island", "Ikoyi"],
        initials: "TA",
        color: "#3B82F6",
        verified: true,
    },
    {
        id: "6",
        name: "Ngozi Eze",
        title: "Luxury Property Consultant",
        location: "Abuja, Nigeria",
        phone: "+234 806 789 0123",
        email: "ngozi@amismarthomes.ng",
        rating: 5.0,
        reviews: 29,
        listings: 12,
        sold: 44,
        specialties: ["Luxury", "Asokoro", "Maitama"],
        initials: "NE",
        color: "#F59E0B",
        verified: true,
    },
];

const LOCATIONS = ["All Locations", "Lagos", "Abuja", "Port Harcourt", "Kano"];

const AmiAgents = () => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("All Locations");

    const filtered = DEMO_AGENTS.filter((a) => {
        const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
        const matchLocation = location === "All Locations" || a.location.includes(location);
        return matchSearch && matchLocation;
    });

    return (
        <div className="ami-page ami-agents-page">
            <AmiNavbar />

            {/* Header */}
            <div className="ami-agents-header">
                <div className="ami-container">
                    <div className="ami-badge ami-agents-header__badge">
                        <MdVerified /> Certified Professionals
                    </div>
                    <h1 className="ami-agents-header__title">Our Property Agents</h1>
                    <p className="ami-agents-header__sub">
                        Work with Nigeria's most trusted, verified real estate professionals
                    </p>

                    {/* Search + filter */}
                    <div className="ami-agents-header__controls">
                        <div className="ami-agents-search">
                            <FaSearch className="ami-agents-search__icon" />
                            <input
                                type="text"
                                placeholder="Search agents by name or specialty..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Search agents"
                            />
                        </div>
                        <div className="ami-agents-filter">
                            {LOCATIONS.map((loc) => (
                                <button
                                    key={loc}
                                    className={`ami-filter-pill ${location === loc ? "active" : ""}`}
                                    onClick={() => setLocation(loc)}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="ami-container ami-agents-body">
                <p className="ami-agents-count">
                    {filtered.length} agent{filtered.length !== 1 ? "s" : ""} found
                </p>

                {filtered.length === 0 ? (
                    <div className="ami-agents-empty">
                        <span>🔍</span>
                        <p>No agents found for your search</p>
                        <button className="ami-btn-outline" onClick={() => { setSearch(""); setLocation("All Locations"); }}>
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="ami-agents-grid">
                        {filtered.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))}
                    </div>
                )}
            </div>

            {/* CTA */}
            <section className="ami-agents-cta">
                <div className="ami-container ami-agents-cta__inner">
                    <div>
                        <h2 className="ami-agents-cta__title">Are you a property agent?</h2>
                        <p className="ami-agents-cta__sub">Join AMI Smart Homes and connect with thousands of property seekers across Nigeria.</p>
                    </div>
                    <button className="ami-btn-primary ami-agents-cta__btn">
                        Join as an Agent
                    </button>
                </div>
            </section>

            <AmiFooter />
        </div>
    );
};

const AgentCard = ({ agent }) => {
    const [contacted, setContacted] = useState(false);

    return (
        <div className="ami-agent-card">
            <div className="ami-agent-card__top">
                <div className="ami-agent-card__avatar" style={{ background: agent.color }}>
                    {agent.initials}
                </div>
                {agent.verified && (
                    <div className="ami-agent-card__verified">
                        <MdVerified /> Verified
                    </div>
                )}
            </div>

            <div className="ami-agent-card__info">
                <h3 className="ami-agent-card__name">{agent.name}</h3>
                <p className="ami-agent-card__title">{agent.title}</p>
                <div className="ami-agent-card__location">
                    <FaMapMarkerAlt /> {agent.location}
                </div>
            </div>

            <div className="ami-agent-card__rating">
                <div className="ami-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} style={{ opacity: i < Math.round(agent.rating) ? 1 : 0.25 }} />
                    ))}
                </div>
                <span className="ami-agent-card__rating-val">{agent.rating}</span>
                <span className="ami-agent-card__reviews">({agent.reviews} reviews)</span>
            </div>

            <div className="ami-agent-card__stats">
                <div className="ami-agent-card__stat">
                    <span>{agent.listings}</span>
                    <small>Active Listings</small>
                </div>
                <div className="ami-agent-card__stat-divider" />
                <div className="ami-agent-card__stat">
                    <span>{agent.sold}</span>
                    <small>Properties Sold</small>
                </div>
            </div>

            <div className="ami-agent-card__specialties">
                {agent.specialties.map((s) => (
                    <span key={s} className="ami-agent-card__specialty">{s}</span>
                ))}
            </div>

            <div className="ami-agent-card__actions">
                <a href={`tel:${agent.phone}`} className="ami-agent-card__action ami-agent-card__action--outline">
                    <FaPhone /> Call
                </a>
                <a href={`mailto:${agent.email}`} className="ami-agent-card__action ami-agent-card__action--primary">
                    <FaEnvelope /> Email
                </a>
            </div>
        </div>
    );
};

export default AmiAgents;
