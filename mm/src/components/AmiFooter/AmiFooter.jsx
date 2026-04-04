import { Link } from "react-router-dom";
import { FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import "./AmiFooter.css";

const AmiFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="ami-footer">
            <div className="ami-container">
                <div className="ami-footer__grid">
                    {/* Brand */}
                    <div className="ami-footer__brand">
                        <div className="ami-footer__logo">
                            <div className="ami-footer__logo-icon"><FaHome /></div>
                            <div>
                                <div className="ami-footer__logo-name">AMI Smart Homes</div>
                                <div className="ami-footer__logo-sub">& Properties</div>
                            </div>
                        </div>
                        <p className="ami-footer__desc">
                            Nigeria's trusted platform for buying, renting, and investing in verified properties.
                            Find your dream home with confidence.
                        </p>
                        <div className="ami-footer__socials">
                            <a href="#" aria-label="Twitter" className="ami-footer__social"><FaXTwitter /></a>
                            <a href="#" aria-label="Instagram" className="ami-footer__social"><FaInstagram /></a>
                            <a href="#" aria-label="Facebook" className="ami-footer__social"><FaFacebook /></a>
                            <a href="#" aria-label="LinkedIn" className="ami-footer__social"><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="ami-footer__col">
                        <h4 className="ami-footer__col-title">Quick Links</h4>
                        <ul className="ami-footer__links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/properties?status=sale">Buy Property</Link></li>
                            <li><Link to="/properties?status=rent">Rent Property</Link></li>
                            <li><Link to="/agents">Our Agents</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div className="ami-footer__col">
                        <h4 className="ami-footer__col-title">Property Types</h4>
                        <ul className="ami-footer__links">
                            <li><Link to="/properties?type=house">Houses</Link></li>
                            <li><Link to="/properties?type=apartment">Apartments</Link></li>
                            <li><Link to="/properties?type=land">Land</Link></li>
                            <li><Link to="/properties?type=commercial">Commercial</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="ami-footer__col">
                        <h4 className="ami-footer__col-title">Contact Us</h4>
                        <ul className="ami-footer__contact">
                            <li>
                                <FaMapMarkerAlt className="ami-footer__contact-icon" />
                                <span>Plot 123, Wuse Zone 5, Abuja, Nigeria</span>
                            </li>
                            <li>
                                <FaPhone className="ami-footer__contact-icon" />
                                <a href="tel:+2348000000000">+234 800 000 0000</a>
                            </li>
                            <li>
                                <FaEnvelope className="ami-footer__contact-icon" />
                                <a href="mailto:hello@amismarthomes.ng">hello@amismarthomes.ng</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="ami-footer__bottom">
                    <p>© {year} AMI Smart Homes & Properties. All rights reserved.</p>
                    <div className="ami-footer__bottom-links">
                        <Link to="">Privacy Policy</Link>
                        <Link to="">Terms of Service</Link>
                        <Link to="">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AmiFooter;
