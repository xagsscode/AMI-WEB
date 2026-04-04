import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../backend/firebase.config";
import { FaSearch, FaUsers } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const load = async () => {
        setLoading(true);
        try {
            const snap = await getDocs(collection(db, "ami_users"));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Sort by createdAt desc
            data.sort((a, b) => {
                const da = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
                const db2 = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
                return db2 - da;
            });
            setUsers(data);
            setFiltered(data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    useEffect(() => {
        if (!search) { setFiltered(users); return; }
        const q = search.toLowerCase();
        setFiltered(users.filter(u =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q)
        ));
    }, [search, users]);

    const fmtDate = (val) => {
        if (!val) return "—";
        const d = val?.toDate ? val.toDate() : new Date(val);
        return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    const initials = (u) => {
        if (u.name) return u.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
        return u.email?.[0]?.toUpperCase() || "?";
    };

    // Stats
    const now = new Date();
    const thisMonth = users.filter(u => {
        const d = u.createdAt?.toDate ? u.createdAt.toDate() : new Date(u.createdAt || 0);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return (
        <div>
            <div className="admin-page-header">
                <h1>User Management</h1>
                <p>Manage all registered users</p>
            </div>

            {/* Mini stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
                {[
                    { label: "Total Users", value: users.length },
                    { label: "Active Users", value: users.length },
                    { label: "New This Month", value: thisMonth },
                ].map(s => (
                    <div key={s.label} className="admin-stat-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                        <div className="admin-stat-card__label">{s.label}</div>
                        <div className="admin-stat-card__value">{loading ? "..." : s.value}</div>
                    </div>
                ))}
            </div>

            <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                    <FaSearch />
                    <input placeholder="Search by name or email..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="admin-refresh-btn" onClick={load}><MdRefresh /> Refresh</button>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-card__header">
                    <h3>Users List</h3>
                    <span className="admin-table-card__badge">{filtered.length} shown</span>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Provider</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} style={{ textAlign: "center", color: "#aaa", padding: 40 }}>Loading users...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={4} style={{ textAlign: "center", color: "#aaa", padding: 40 }}>No users found</td></tr>
                        ) : filtered.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div className="admin-table__user">
                                        {u.photoURL
                                            ? <img src={u.photoURL} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                                            : <div className="admin-table__avatar">{initials(u)}</div>}
                                        <div>
                                            <div className="admin-table__name">{u.name || "—"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ color: "#555" }}>{u.email}</td>
                                <td>
                                    <span className="admin-badge user">
                                        {u.provider === "google" ? "Google" : "Email"}
                                    </span>
                                </td>
                                <td style={{ color: "#888", fontSize: 13 }}>{fmtDate(u.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
