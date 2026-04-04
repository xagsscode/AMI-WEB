import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../backend/firebase.config";
import { FaSearch, FaTrash, FaEye, FaBuilding } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

const fmt = (n) => {
    if (n >= 1e9) return `₦${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `₦${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `₦${(n / 1e3).toFixed(0)}K`;
    return `₦${n}`;
};

const AdminProperties = () => {
    const [properties, setProperties] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const load = async () => {
        setLoading(true);
        try {
            const snap = await getDocs(query(collection(db, "properties"), orderBy("createdAt", "desc")));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setProperties(data);
            setFiltered(data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    useEffect(() => {
        let res = properties;
        if (search) res = res.filter(p =>
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.location?.toLowerCase().includes(search.toLowerCase())
        );
        if (typeFilter !== "all") res = res.filter(p => p.type === typeFilter);
        if (statusFilter !== "all") res = res.filter(p => p.status === statusFilter);
        setFiltered(res);
    }, [search, typeFilter, statusFilter, properties]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this property? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, "properties", id));
            setProperties(prev => prev.filter(p => p.id !== id));
        } catch (e) { alert("Failed to delete."); }
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>Explore Properties</h1>
                <p>Manage all listed properties</p>
            </div>

            <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                    <FaSearch />
                    <input placeholder="Search by title or location..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="admin-filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                </select>
                <select className="admin-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                </select>
                <button className="admin-refresh-btn" onClick={load}><MdRefresh /> Refresh</button>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-card__header">
                    <h3>Properties List</h3>
                    <span className="admin-table-card__badge">{filtered.length} shown</span>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ textAlign: "center", color: "#aaa", padding: 40 }}>Loading...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: "center", color: "#aaa", padding: 40 }}>No properties found</td></tr>
                        ) : filtered.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div className="admin-table__user">
                                        {p.images?.[0]
                                            ? <img src={p.images[0]} alt="" className="admin-prop-img" />
                                            : <div className="admin-table__avatar"><FaBuilding /></div>}
                                        <div>
                                            <div className="admin-table__name">{p.title}</div>
                                            <div className="admin-table__sub">{p.area ? `${p.area} ${p.areaUnit || "sqm"}` : ""}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`admin-badge ${p.type}`}>{p.type}</span></td>
                                <td><span className={`admin-badge ${p.status}`}>{p.status === "sale" ? "For Sale" : "For Rent"}</span></td>
                                <td style={{ fontWeight: 700 }}>
                                    {fmt(p.price || 0)}
                                    {p.priceType === "negotiable" && <span style={{ fontSize: 11, color: "#aaa", marginLeft: 4 }}>(neg.)</span>}
                                </td>
                                <td>{p.location}</td>
                                <td>{p.featured ? <span className="admin-badge sale">Yes</span> : <span style={{ color: "#ccc" }}>—</span>}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <button className="admin-action-btn view" title="View on site"
                                            onClick={() => window.open("/properties", "_blank")}>
                                            <FaEye />
                                        </button>
                                        <button className="admin-action-btn delete" title="Delete"
                                            onClick={() => handleDelete(p.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProperties;
