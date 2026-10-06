import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import "./AmiAgents.css";

const AmiAgents = () => (
    <div className="ami-page">
        <AmiNavbar />
        <main>
            <section className="ami-agents-header">
                <div className="ami-container">
                    <div className="ami-badge">Personal property guidance</div>
                    <h1 className="ami-agents-header__title">Talk to Our Property Team</h1>
                    <p className="ami-agents-header__sub">Get help exploring our developments in Abuja and Kano.</p>
                </div>
            </section>
            <section className="ami-section">
                <div className="ami-container">
                    <h2 className="ami-section-title">Find the right next step</h2>
                    <p className="ami-section-subtitle">Tell us your preferred location, budget, and property type. Our team can help with availability, site visits, and questions about ownership.</p>
                    <Link to="/contact" className="ami-btn-primary" style={{ marginTop: 24 }}>Contact Our Team <FaArrowRight /></Link>
                </div>
            </section>
        </main>
        <AmiFooter />
    </div>
);
export default AmiAgents;
