import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaHome, FaMoneyBillWave, FaLock } from "react-icons/fa";
import SellPropertyModal from "../SellPropertyModal/SellPropertyModal";
import { useNewAuth } from "../../contexts/NewAuthContext";
import "./SearchBar.css";

const PROPERTY_TYPES = [
    { value: "all", label: "All Types" },
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" },
];

const PRICE_RANGES = [
    { value: "all", label: "Any Price" },
    { value: "0-5000000", label: "Under ₦5M" },
    { value: "5000000-20000000", label: "₦5M – ₦20M" },
    { value: "20000000-50000000", label: "₦20M – ₦50M" },
    { value: "50000000-100000000", label: "₦50M – ₦100M" },
    { value: "100000000+", label: "Above ₦100M" },
];

const SearchBar = ({ onSearch, compact = false }) => {
    const navigate = useNavigate();
    const { user } = useNewAuth();
    const [mode, setMode] = useState("buy");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const [showSell, setShowSell] = useState(false);

    const requireAuth = () => {
        if (!user) { navigate("/login"); return false; }
        return true;
    };

    const handleModeChange = (newMode) => {
        if ((newMode === "sell" || newMode === "rent") && !requireAuth()) return;
        setMode(newMode);
        if (newMode === "sell") setShowSell(true);
    };

    const handleSearch = () => {
        if (!requireAuth()) return;
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (type !== "all") params.set("type", type);
        if (priceRange !== "all") params.set("price", priceRange);
        params.set("status", mode === "buy" ? "sale" : "rent");
        if (onSearch) {
            onSearch({ location, type, priceRange, status: mode === "buy" ? "sale" : "rent" });
        } else {
            navigate(`/properties?${params.toString()}`);
        }
    };

    return (
        <>
            <div className={`ami-searchbar ${compact ? "ami-searchbar--compact" : ""}`}>
                {/* Buy / Sell / Rent Toggle */}
                <div className="ami-searchbar__toggle">
                    <button
                        className={`ami-searchbar__toggle-btn ${mode === "buy" ? "active" : ""}`}
                        onClick={() => handleModeChange("buy")}
                    >
                        Buy
                    </button>
                    <button
                        className={`ami-searchbar__toggle-btn ${mode === "sell" ? "active" : ""}`}
                        onClick={() => handleModeChange("sell")}
                    >
                        {!user && <FaLock style={{ fontSize: 10, marginRight: 4 }} />}
                        Sell
                    </button>
                    <button
                        className={`ami-searchbar__toggle-btn ${mode === "rent" ? "active" : ""}`}
                        onClick={() => handleModeChange("rent")}
                    >
                        {!user && <FaLock style={{ fontSize: 10, marginRight: 4 }} />}
                        Rent
                    </button>
                </div>

                {/* Buy / Rent search fields */}
                {mode !== "sell" && (
                    <div className="ami-searchbar__fields">
                        <div className="ami-searchbar__field">
                            <FaMapMarkerAlt className="ami-searchbar__field-icon" />
                            <input
                                type="text"
                                placeholder={user ? "Enter location (e.g. Abuja, Lagos)" : "Sign in to search properties..."}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="ami-searchbar__input"
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                onFocus={() => !user && navigate("/login")}
                                readOnly={!user}
                                aria-label="Location"
                            />
                        </div>

                        <div className="ami-searchbar__divider" />

                        <div className="ami-searchbar__field">
                            <FaHome className="ami-searchbar__field-icon" />
                            <select
                                value={type}
                                onChange={(e) => { if (!requireAuth()) return; setType(e.target.value); }}
                                className="ami-searchbar__select"
                                aria-label="Property type"
                            >
                                {PROPERTY_TYPES.map((t) => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="ami-searchbar__divider" />

                        <div className="ami-searchbar__field">
                            <FaMoneyBillWave className="ami-searchbar__field-icon" />
                            <select
                                value={priceRange}
                                onChange={(e) => { if (!requireAuth()) return; setPriceRange(e.target.value); }}
                                className="ami-searchbar__select"
                                aria-label="Price range"
                            >
                                {PRICE_RANGES.map((p) => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        <button className="ami-searchbar__btn" onClick={handleSearch} aria-label="Search properties">
                            {!user ? <FaLock /> : <FaSearch />}
                            <span>{user ? "Search" : "Sign In"}</span>
                        </button>
                    </div>
                )}

                {/* Sell prompt */}
                {mode === "sell" && (
                    <div className="ami-searchbar__fields">
                        <p className="ami-searchbar__sell-hint">
                            List your property and reach thousands of buyers across Nigeria.
                        </p>
                        <button
                            className="ami-searchbar__btn"
                            onClick={() => setShowSell(true)}
                            aria-label="List your property"
                        >
                            List Property
                        </button>
                    </div>
                )}
            </div>

            {showSell && (
                <SellPropertyModal
                    onClose={() => { setShowSell(false); setMode("buy"); }}
                />
            )}
        </>
    );
};

export default SearchBar;
