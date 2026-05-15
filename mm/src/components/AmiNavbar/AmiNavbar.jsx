import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { useNewAuth } from "../../contexts/NewAuthContext";
import amiLogo from "../../assets/Image/AMI.png";
import "./AmiNavbar.css";

const GUEST_LINKS = [
    { label: "Home", href: "/" },
    { label: "Agents", href: "/agents" },
    { label: "Contact", href: "/contact" },
];

const AUTH_LINKS = [
    { label: "Home", href: "/" },
    { label: "Buy", href: "/properties?status=sale" },
    { label: "Rent", href: "/properties?status=rent" },
    { label: "Properties", href: "/properties" },
    { label: "Agents", href: "/agents" },
    { label: "Contact", href: "/contact" },
];

const AmiNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, signOut } = useNewAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const NAV_LINKS = user ? AUTH_LINKS : GUEST_LINKS;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <nav className={`ami-navbar ${scrolled ? "ami-navbar--scrolled" : ""}`}>
            <div className="ami-container ami-navbar__inner">
                {/* Logo */}
                <Link to="/" className="ami-navbar__logo">
                    <img
                        src={amiLogo}
                        alt="AMI Smart Homes & Properties Ltd"
                        className="ami-navbar__logo-img"
                    />
                </Link>

                {/* Desktop links */}
                <div className="ami-navbar__links">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className={`ami-navbar__link ${location.pathname + location.search === link.href ? "active" : location.pathname === link.href && !link.href.includes("?") ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop actions */}
                <div className="ami-navbar__actions">
                    {user ? (
                        <>
                            <button
                                className="ami-btn-outline ami-navbar__btn-login"
                                onClick={() => navigate("/")}
                            >
                                <FaUserCircle style={{ marginRight: 6 }} />
                                {user.name || user.email?.split("@")[0]}
                            </button>
                            <button className="ami-btn-ghost ami-navbar__btn-signout" onClick={signOut}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="ami-btn-outline ami-navbar__btn-login" onClick={() => navigate("/login")}>
                                Login
                            </button>
                            <button className="ami-btn-primary" onClick={() => navigate("/signup")}>
                                Get Started
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className="ami-navbar__mobile-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <IoClose size={24} /> : <HiMenuAlt3 size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="ami-navbar__mobile-menu">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="ami-navbar__mobile-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="ami-navbar__mobile-actions">
                        {user ? (
                            <>
                                <button className="ami-btn-outline" onClick={() => navigate("/")}>
                                    {user.name || user.email?.split("@")[0]}
                                </button>
                                <button className="ami-btn-ghost" onClick={signOut}>Sign Out</button>
                            </>
                        ) : (
                            <>
                                <button className="ami-btn-outline" onClick={() => navigate("/login")}>Login</button>
                                <button className="ami-btn-primary" onClick={() => navigate("/signup")}>Get Started</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AmiNavbar;
