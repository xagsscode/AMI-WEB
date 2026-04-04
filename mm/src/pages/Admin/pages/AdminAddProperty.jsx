import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../backend/firebase.config";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle } from "react-icons/fa";

const TYPES = ["house", "apartment", "land", "commercial"];
const STATUSES = [{ v: "sale", l: "For Sale" }, { v: "rent", l: "For Rent" }];

const INIT = {
    title: "", type: "house", status: "sale", price: "",
    priceType: "fixed", area: "", areaUnit: "sqm",
    bedrooms: "", bathrooms: "", location: "", description: "", featured: false,
};

const AdminAddProperty = () => {
    const [form, setForm] = useState(INIT);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleImages = (e) => {
        const files = Array.from(e.target.files).slice(0, 8);
        setImages(files);
        setPreviews(files.map(f => URL.createObjectURL(f)));
    };

    const uploadImages = async () => {
        if (!images.length) return [];
        return Promise.all(images.map(file => uploadToCloudinary(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.price || !form.location) {
            setError("Title, price and location are required.");
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
                featured: form.featured,
                addedBy: "admin",
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
            setForm(INIT);
            setImages([]);
            setPreviews([]);
            setTimeout(() => setSuccess(false), 4000);
        } catch (err) {
            setError("Failed to add property. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>Add Property</h1>
                <p>Fill in the details to list a new property on the website</p>
            </div>

            {success && (
                <div className="admin-success-msg">
                    <FaCheckCircle /> Property added successfully and is now live on the website!
                </div>
            )}
            {error && <div className="admin-error-msg">{error}</div>}

            <div className="admin-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="admin-form-grid">

                        {/* Type */}
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Property Type <span>*</span></label>
                            <div className="admin-type-pills">
                                {TYPES.map(t => (
                                    <button key={t} type="button"
                                        className={`admin-type-pill ${form.type === t ? "active" : ""}`}
                                        onClick={() => set("type", t)}
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Listing for */}
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Listing For <span>*</span></label>
                            <div className="admin-type-pills">
                                {STATUSES.map(s => (
                                    <button key={s.v} type="button"
                                        className={`admin-type-pill ${form.status === s.v ? "active" : ""}`}
                                        onClick={() => set("status", s.v)}
                                    >
                                        {s.l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Property Title <span>*</span></label>
                            <input className="admin-form-input" placeholder="e.g. 4-Bedroom Duplex in Maitama"
                                value={form.title} onChange={e => set("title", e.target.value)} />
                        </div>

                        {/* Location */}
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Location <span>*</span></label>
                            <input className="admin-form-input" placeholder="e.g. Lekki Phase 1, Lagos"
                                value={form.location} onChange={e => set("location", e.target.value)} />
                        </div>

                        {/* Price */}
                        <div className="admin-form-group">
                            <label className="admin-form-label">Price (₦) <span>*</span></label>
                            <input className="admin-form-input" type="number" placeholder="e.g. 45000000"
                                value={form.price} onChange={e => set("price", e.target.value)} min="0" />
                        </div>

                        {/* Price type */}
                        <div className="admin-form-group">
                            <label className="admin-form-label">Price Type</label>
                            <div className="admin-price-toggle">
                                {["fixed", "negotiable"].map(pt => (
                                    <button key={pt} type="button"
                                        className={form.priceType === pt ? "active" : ""}
                                        onClick={() => set("priceType", pt)}
                                    >
                                        {pt.charAt(0).toUpperCase() + pt.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Area */}
                        <div className="admin-form-group">
                            <label className="admin-form-label">Area / Size</label>
                            <input className="admin-form-input" type="number" placeholder="e.g. 450"
                                value={form.area} onChange={e => set("area", e.target.value)} min="0" />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Area Unit</label>
                            <select className="admin-form-select" value={form.areaUnit} onChange={e => set("areaUnit", e.target.value)}>
                                <option value="sqm">Square Meters (sqm)</option>
                                <option value="sqft">Square Feet (sqft)</option>
                                <option value="acres">Acres</option>
                                <option value="hectares">Hectares</option>
                                <option value="plots">Plots</option>
                            </select>
                        </div>

                        {/* Beds / Baths — hide for land */}
                        {form.type !== "land" && <>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Bedrooms</label>
                                <input className="admin-form-input" type="number" placeholder="e.g. 3"
                                    value={form.bedrooms} onChange={e => set("bedrooms", e.target.value)} min="0" />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Bathrooms</label>
                                <input className="admin-form-input" type="number" placeholder="e.g. 2"
                                    value={form.bathrooms} onChange={e => set("bathrooms", e.target.value)} min="0" />
                            </div>
                        </>}

                        {/* Description */}
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Description</label>
                            <textarea className="admin-form-textarea"
                                placeholder="Describe the property — features, condition, nearby landmarks..."
                                value={form.description} onChange={e => set("description", e.target.value)} />
                        </div>

                        {/* Featured */}
                        <div className="admin-form-group full">
                            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)}
                                    style={{ width: 16, height: 16 }} />
                                <span className="admin-form-label" style={{ margin: 0 }}>Mark as Featured Property</span>
                            </label>
                        </div>

                        {/* Images */}
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Photos (up to 8)</label>
                            <div className="admin-upload-area">
                                <input type="file" accept="image/*" multiple onChange={handleImages} />
                                <div className="admin-upload-icon"><FaCloudUploadAlt /></div>
                                <p>Click to upload photos</p>
                                <span>JPG, PNG, WEBP — max 8 images</span>
                            </div>
                            {previews.length > 0 && (
                                <div className="admin-preview-grid">
                                    {previews.map((src, i) => (
                                        <img key={i} src={src} alt="" className="admin-preview-img" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="admin-form-submit">
                        <button type="submit" className="admin-btn-primary" disabled={submitting}>
                            {submitting ? <><FaSpinner style={{ animation: "spin 1s linear infinite" }} /> Uploading...</> : "Add Property"}
                        </button>
                        <button type="button" className="admin-btn-secondary" onClick={() => { setForm(INIT); setImages([]); setPreviews([]); }}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
    );
};

export default AdminAddProperty;
