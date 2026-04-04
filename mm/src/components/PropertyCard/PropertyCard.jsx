import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import "./PropertyCard.css";

const formatPrice = (price) => {
    if (!price) return "Price on request";
    return "₦" + Number(price).toLocaleString("en-NG");
};

const PropertyCard = ({ property, skeleton = false }) => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [imgError, setImgError] = useState(false);

    if (skeleton) {
        return (
            <div className="ami-property-card ami-property-card--skeleton">
                <div className="ami-property-card__img ami-skeleton" />
                <div className="ami-property-card__body">
                    <div className="ami-skeleton" style={{ height: 14, width: "40%", marginBottom: 10 }} />
                    <div className="ami-skeleton" style={{ height: 22, width: "80%", marginBottom: 8 }} />
                    <div className="ami-skeleton" style={{ height: 16, width: "60%", marginBottom: 16 }} />
                    <div className="ami-skeleton" style={{ height: 14, width: "90%" }} />
                </div>
            </div>
        );
    }

    const {
        id,
        title = "Property",
        price,
        location = "Nigeria",
        type = "house",
        status = "sale",
        images = [],
        bedrooms,
        bathrooms,
        area,
        featured,
    } = property;

    const imgSrc = !imgError && images.length > 0 ? images[0] : null;

    return (
        <div
            className="ami-property-card"
            onClick={() => navigate(`/properties/${id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/properties/${id}`)}
        >
            <div className="ami-property-card__img-wrap">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={title}
                        className="ami-property-card__img"
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="ami-property-card__img ami-property-card__img--placeholder">
                        <span>🏠</span>
                    </div>
                )}
                <div className="ami-property-card__tags">
                    <span className={`ami-tag ${status === "rent" ? "ami-tag-rent" : "ami-tag-sale"}`}>
                        {status === "rent" ? "For Rent" : "For Sale"}
                    </span>
                    {featured && <span className="ami-tag ami-tag-featured">Featured</span>}
                </div>
                <button
                    className={`ami-property-card__save ${saved ? "saved" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                    aria-label={saved ? "Remove from saved" : "Save property"}
                >
                    {saved ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>

            <div className="ami-property-card__body">
                <div className="ami-property-card__type">{type}</div>
                <div className="ami-property-card__price">{formatPrice(price)}</div>
                <div className="ami-property-card__location">
                    <FaMapMarkerAlt className="ami-property-card__loc-icon" />
                    <span>{location}</span>
                </div>
                <div className="ami-property-card__meta">
                    {bedrooms != null && (
                        <span className="ami-property-card__meta-item">
                            <FaBed /> {bedrooms} Bed{bedrooms !== 1 ? "s" : ""}
                        </span>
                    )}
                    {bathrooms != null && (
                        <span className="ami-property-card__meta-item">
                            <FaBath /> {bathrooms} Bath{bathrooms !== 1 ? "s" : ""}
                        </span>
                    )}
                    {area && (
                        <span className="ami-property-card__meta-item">
                            <MdSquareFoot /> {area} m²
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
