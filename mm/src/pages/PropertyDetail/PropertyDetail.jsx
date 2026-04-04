import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase.config";
import { useSubmitInquiry } from "../../hooks/use-properties";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import {
    FaBed, FaBath, FaMapMarkerAlt, FaArrowLeft,
    FaWhatsapp, FaEnvelope, FaCheckCircle, FaSpinner,
} from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import "./PropertyDetail.css";

const formatPrice = (price) => {
    if (!price) return "Price on request";
    return "₦" + Number(price).toLocaleString("en-NG");
};

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [sent, setSent] = useState(false);
    const { submit, submitting } = useSubmitInquiry();

    useEffect(() => {
        const fetch = async () => {
            try {
                const snap = await getDoc(doc(db, "properties", id));
                if (snap.exists()) {
                    setProperty({ id: snap.id, ...snap.data() });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleInquiry = async (e) => {
        e.preventDefault();
        const result = await submit({ ...form, propertyId: id, propertyTitle: property?.title });
        if (result.success) {
            setSent(true);
            setForm({ name: "", email: "", phone: "", message: "" });
        }
    };

    if (loading) {
        return (
            <div className="ami-page">
                <AmiNavbar />
                <div className="pd-loading"><div className="ami-loading-spinner" /></div>
                <AmiFooter />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="ami-page">
                <AmiNavbar />
                <div className="pd-not-found">
                    <span>🏠</span>
                    <h2>Property not found</h2>
                    <button className="ami-btn-outline" onClick={() => navigate("/properties")}>
                        Back to Properties
                    </button>
                </div>
                <AmiFooter />
            </div>
        );
    }

    const { title, price, location, type, status, images = [], bedrooms,
        bathrooms, area, areaUnit, description, featured, priceType } = property;

    return (
        <div className="ami-page pd-page">
            <AmiNavbar />

            <div className="ami-container pd-container">
                {/* Back */}
                <button className="pd-back" onClick={() => navigate("/properties")}>
                    <FaArrowLeft /> Back to Properties
                </button>

                {/* Gallery */}
                <div className="pd-gallery">
                    <div className="pd-gallery__main">
                        {images.length > 0 ? (
                            <img src={images[activeImg]} alt={title} className="pd-gallery__img" />
                        ) : (
                            <div className="pd-gallery__placeholder"><span>🏠</span></div>
                        )}
                        <div className="pd-tags">
                            <span className={`ami-tag ${status === "rent" ? "ami-tag-rent" : "ami-tag-sale"}`}>
                                {status === "rent" ? "For Rent" : "For Sale"}
                            </span>
                            {featured && <span className="ami-tag ami-tag-featured">Featured</span>}
                        </div>
                    </div>
                    {images.length > 1 && (
                        <div className="pd-gallery__thumbs">
                            {images.map((src, i) => (
                                <img key={i} src={src} alt=""
                                    className={`pd-gallery__thumb ${i === activeImg ? "active" : ""}`}
                                    onClick={() => setActiveImg(i)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="pd-content">
                    <div className="pd-main">
                        <div className="pd-type">{type}</div>
                        <h1 className="pd-title">{title}</h1>
                        <div className="pd-location"><FaMapMarkerAlt /> {location}</div>
                        <div className="pd-price">
                            {formatPrice(price)}
                            {priceType === "negotiable" && <span className="pd-negotiable">Negotiable</span>}
                        </div>

                        <div className="pd-meta">
                            {bedrooms != null && (
                                <div className="pd-meta__item"><FaBed /><span>{bedrooms} Bedroom{bedrooms !== 1 ? "s" : ""}</span></div>
                            )}
                            {bathrooms != null && (
                                <div className="pd-meta__item"><FaBath /><span>{bathrooms} Bathroom{bathrooms !== 1 ? "s" : ""}</span></div>
                            )}
                            {area && (
                                <div className="pd-meta__item"><MdSquareFoot /><span>{area} {areaUnit || "sqm"}</span></div>
                            )}
                        </div>

                        {description && (
                            <div className="pd-section">
                                <h3 className="pd-section__title">About this property</h3>
                                <p className="pd-description">{description}</p>
                            </div>
                        )}
                    </div>

                    {/* Inquiry form */}
                    <div className="pd-inquiry">
                        <h3 className="pd-inquiry__title">Interested? Get in touch</h3>
                        {sent ? (
                            <div className="pd-inquiry__success">
                                <FaCheckCircle />
                                <p>Your inquiry has been sent. We'll be in touch shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleInquiry} className="pd-inquiry__form">
                                <input className="pd-input" placeholder="Your name *" required
                                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                <input className="pd-input" type="email" placeholder="Email address *" required
                                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                <input className="pd-input" placeholder="Phone number"
                                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                                <textarea className="pd-textarea"
                                    placeholder={`I'm interested in "${title}". Please contact me.`}
                                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                                <button type="submit" className="pd-inquiry__btn" disabled={submitting}>
                                    {submitting ? <><FaSpinner className="spin" /> Sending...</> : <>
                                        <FaEnvelope /> Send Inquiry
                                    </>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <AmiFooter />
        </div>
    );
};

export default PropertyDetail;
