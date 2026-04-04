import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../backend/firebase.config";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import { useNewAuth } from "../../contexts/NewAuthContext";
import {
    FaHome, FaBuilding, FaTree, FaStore,
    FaTimes, FaCloudUploadAlt, FaCheckCircle, FaSpinner,
} from "react-icons/fa";
import "./SellPropertyModal.css";

const PROPERTY_TYPES = [
    { value: "house", label: "House", icon: <FaHome /> },
    { value: "apartment", label: "Apartment", icon: <FaBuilding /> },
    { value: "land", label: "Land", icon: <FaTree /> },
    { value: "commercial", label: "Commercial", icon: <FaStore /> },
];

const INITIAL = {
    title: "",
    type: "house",
    status: "sale",
    price: "",
    priceType: "fixed",
    area: "",
    areaUnit: "sqm",
    bedrooms: "",
    bathrooms: "",
    location: "",
    description: "",
};

const SellPropertyModal = ({ onClose }) => {
    const { user } = useNewAuth();
    const [form, setForm] = useState(INITIAL);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

    const handleImages = (e) => {
        const files = Array.from(e.target.files).slice(0, 6);
        setImages(files);
        setPreviews(files.map((f) => URL.createObjectURL(f)));
    };

    const uploadImages = async () => {
        if (!images.length) return [];
        return Promise.all(images.map(file => uploadToCloudinary(file)));
    };

    const handleSubmit = async () => {
        if (!form.title || !form.price || !form.location) {
            setError("Please fill in title, price, and location.");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            const imageUrls = await uploadImages();
            await addDoc(collection(db, "properties"), {
                title: form.title,
                type: form.type,
                status: form.status,
                price: Number(form.price),
                priceType: form.priceType,
                area: form.area ? Number(form.area) : null,
                areaUnit: form.areaUnit,
                bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
                bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
                location: form.location,
                description: form.description,
                images: imageUrls,
                featured: false,
                sellerEmail: user?.email || "",
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="sell-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="sell-modal" role="dialog" aria-modal="true" aria-label="List your property">

                {/* Header */}
                <div className="sell-modal__header">
                    <div>
                        <div className="sell-modal__title">List Your Property</div>
                        <div className="sell-modal__subtitle">Fill in the details to get your property listed</div>
                    </div>
                    <button className="sell-modal__close" onClick={onClose} aria-label="Close">
                        <FaTimes />
                    </button>
                </div>

                {success ? (
                    <div className="sell-modal__success">
                        <div className="sell-modal__success-icon"><FaCheckCircle /></div>
                        <h3>Listing Submitted!</h3>
                        <p>Your property has been submitted for review. We'll verify and publish it shortly.</p>
                        <button className="sell-modal__submit" style={{ maxWidth: 200 }} onClick={onClose}>
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="sell-modal__body">

                            {/* Property Type */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Property Type <span>*</span></label>
                                <div className="sell-form__type-grid">
                                    {PROPERTY_TYPES.map((t) => (
                                        <button
                                            key={t.value}
                                            type="button"
                                            className={`sell-form__type-pill ${form.type === t.value ? "active" : ""}`}
                                            onClick={() => set("type", t.value)}
                                        >
                                            {t.icon}
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Listing Intent */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Listing For <span>*</span></label>
                                <div className="sell-form__price-type">
                                    <button
                                        type="button"
                                        className={`sell-form__price-btn ${form.status === "sale" ? "active" : ""}`}
                                        onClick={() => set("status", "sale")}
                                    >
                                        For Sale
                                    </button>
                                    <button
                                        type="button"
                                        className={`sell-form__price-btn ${form.status === "rent" ? "active" : ""}`}
                                        onClick={() => set("status", "rent")}
                                    >
                                        For Rent
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Property Title <span>*</span></label>
                                <input
                                    className="sell-form__input"
                                    placeholder="e.g. 4-Bedroom Duplex in Maitama"
                                    value={form.title}
                                    onChange={(e) => set("title", e.target.value)}
                                />
                            </div>

                            {/* Location */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Location <span>*</span></label>
                                <input
                                    className="sell-form__input"
                                    placeholder="e.g. Lekki Phase 1, Lagos"
                                    value={form.location}
                                    onChange={(e) => set("location", e.target.value)}
                                />
                            </div>

                            {/* Price */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Price (₦) <span>*</span></label>
                                <div className="sell-form__row">
                                    <input
                                        className="sell-form__input"
                                        type="number"
                                        placeholder="e.g. 45000000"
                                        value={form.price}
                                        onChange={(e) => set("price", e.target.value)}
                                        min="0"
                                    />
                                    <div className="sell-form__price-type">
                                        <button
                                            type="button"
                                            className={`sell-form__price-btn ${form.priceType === "fixed" ? "active" : ""}`}
                                            onClick={() => set("priceType", "fixed")}
                                        >
                                            Fixed
                                        </button>
                                        <button
                                            type="button"
                                            className={`sell-form__price-btn ${form.priceType === "negotiable" ? "active" : ""}`}
                                            onClick={() => set("priceType", "negotiable")}
                                        >
                                            Negotiable
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Area */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Size / Area</label>
                                <div className="sell-form__row">
                                    <input
                                        className="sell-form__input"
                                        type="number"
                                        placeholder="e.g. 450"
                                        value={form.area}
                                        onChange={(e) => set("area", e.target.value)}
                                        min="0"
                                    />
                                    <select
                                        className="sell-form__select"
                                        value={form.areaUnit}
                                        onChange={(e) => set("areaUnit", e.target.value)}
                                    >
                                        <option value="sqm">Square Meters (sqm)</option>
                                        <option value="sqft">Square Feet (sqft)</option>
                                        <option value="acres">Acres</option>
                                        <option value="hectares">Hectares</option>
                                        <option value="plots">Plots</option>
                                    </select>
                                </div>
                            </div>

                            {/* Bedrooms & Bathrooms — hide for land */}
                            {form.type !== "land" && (
                                <div className="sell-form__row">
                                    <div className="sell-form__group">
                                        <label className="sell-form__label">Bedrooms</label>
                                        <input
                                            className="sell-form__input"
                                            type="number"
                                            placeholder="e.g. 3"
                                            value={form.bedrooms}
                                            onChange={(e) => set("bedrooms", e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                    <div className="sell-form__group">
                                        <label className="sell-form__label">Bathrooms</label>
                                        <input
                                            className="sell-form__input"
                                            type="number"
                                            placeholder="e.g. 2"
                                            value={form.bathrooms}
                                            onChange={(e) => set("bathrooms", e.target.value)}
                                            min="0"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Description</label>
                                <textarea
                                    className="sell-form__textarea"
                                    placeholder="Describe the property — features, condition, nearby landmarks..."
                                    value={form.description}
                                    onChange={(e) => set("description", e.target.value)}
                                />
                            </div>

                            {/* Images */}
                            <div className="sell-form__group">
                                <label className="sell-form__label">Photos (up to 6)</label>
                                <div className="sell-form__upload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImages}
                                        aria-label="Upload property photos"
                                    />
                                    <div className="sell-form__upload-icon"><FaCloudUploadAlt /></div>
                                    <p>Click to upload photos</p>
                                    <span>JPG, PNG, WEBP — max 6 images</span>
                                </div>
                                {previews.length > 0 && (
                                    <div className="sell-form__preview">
                                        {previews.map((src, i) => (
                                            <img key={i} src={src} alt={`preview ${i + 1}`} className="sell-form__preview-img" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {error && (
                                <p style={{ color: "#e53e3e", fontSize: 13, margin: 0 }}>{error}</p>
                            )}
                        </div>

                        <div className="sell-modal__footer">
                            <button className="sell-modal__cancel" onClick={onClose}>Cancel</button>
                            <button
                                className="sell-modal__submit"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? <><FaSpinner style={{ animation: "spin 1s linear infinite" }} /> Submitting...</> : "Submit Listing"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SellPropertyModal;
