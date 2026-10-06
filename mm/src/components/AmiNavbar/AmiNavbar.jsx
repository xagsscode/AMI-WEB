import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import amiLogo from "../../assets/Image/AMI.png";
import "./AmiNavbar.css";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Buy", href: "/properties?status=sale" },
    { label: "Rent", href: "/properties?status=rent" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
    { label: "Agents", href: "/agents" },
    { label: "Contact", href: "/contact" },
];

const AmiNavbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKeyDown = (event) => { if (event.key === "Escape") setMenuOpen(false); };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <nav aria-label="Main navigation" className={`ami-navbar ${scrolled || location.pathname !== "/" || menuOpen ? "ami-navbar--scrolled" : ""}`}>
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

                <div className="ami-navbar__actions">
                    <Link className="ami-btn-primary" to="/contact">Enquire Now</Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="ami-navbar__mobile-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    {menuOpen ? <IoClose size={24} /> : <HiMenuAlt3 size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div id="mobile-navigation" className="ami-navbar__mobile-menu">
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
                        <Link className="ami-btn-primary" to="/contact" onClick={() => setMenuOpen(false)}>Enquire Now</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AmiNavbar;
