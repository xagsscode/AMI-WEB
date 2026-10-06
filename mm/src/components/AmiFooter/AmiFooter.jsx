import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import amiLogo from "../../assets/Image/AMI.png";
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
                            <img src={amiLogo} alt="AMI Smart Homes & Properties Ltd" className="ami-footer__logo-img" />
                        </div>
                        <p className="ami-footer__desc">
                            Nigeria's trusted platform for buying, renting, and investing in verified properties.
                            Find your dream home with confidence.
                        </p>

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
                                <span>Abuja &amp; Kano, Nigeria</span>
                            </li>

                            <li>
                                <FaEnvelope className="ami-footer__contact-icon" />
                                <a href="mailto:info@amismarthomes.com">info@amismarthomes.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="ami-footer__bottom">
                    <p>© {year} AMI Smart Homes & Properties. All rights reserved.</p>
                    <div className="ami-footer__bottom-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                        <Link to="/cookie-policy">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AmiFooter;
