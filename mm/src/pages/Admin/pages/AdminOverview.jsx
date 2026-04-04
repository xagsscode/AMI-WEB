import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../backend/firebase.config";
import { useNewAuth } from "../../../contexts/NewAuthContext";
import { FaDollarSign, FaUsers, FaBuilding, FaHome, FaStore } from "react-icons/fa";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SALES_BREAKDOWN = [
    { label: "Via Website", pct: 50 },
    { label: "Via Agents", pct: 20 },
    { label: "Via Social Media", pct: 15 },
    { label: "Via Direct Contact", pct: 10 },
    { label: "Via Others", pct: 5 },
];

const AdminOverview = () => {
    const { user } = useNewAuth();
    const [stats, setStats] = useState({ total: 0, forSale: 0, forRent: 0, users: 0, revenue: 0 });
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [propSnap, userSnap] = await Promise.all([
                    getDocs(query(collection(db, "properties"), orderBy("createdAt", "desc"))),
                    getDocs(collection(db, "ami_users")),
                ]);

                const props = propSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                const forSale = props.filter(p => p.status === "sale").length;
                const forRent = props.filter(p => p.status === "rent").length;
                const revenue = props.filter(p => p.status === "sale").reduce((s, p) => s + (p.price || 0), 0);

                setProperties(props.slice(0, 5));
                setStats({ total: props.length, forSale, forRent, users: userSnap.size, revenue });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Build simple monthly bar data from properties
    const barData = MONTHS.map((m, i) => {
        const count = properties.filter(p => {
            const d = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.createdAt || 0);
            return d.getMonth() === i;
        }).length;
        return { month: m, count };
    });
    const maxBar = Math.max(...barData.map(b => b.count), 1);

    const fmt = (n) => {
        if (n >= 1e9) return `₦${(n / 1e9).toFixed(1)}B`;
        if (n >= 1e6) return `₦${(n / 1e6).toFixed(1)}M`;
        if (n >= 1e3) return `₦${(n / 1e3).toFixed(0)}K`;
        return `₦${n}`;
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>Hello, Admin 👋</h1>
                <p>Welcome back! Here's what's happening with AMI Homes.</p>
            </div>

            {/* Stat Cards */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-card__icon green"><FaDollarSign /></div>
                    <div>
                        <div className="admin-stat-card__label">Total Revenue</div>
                        <div className="admin-stat-card__value">{loading ? "..." : fmt(stats.revenue)}</div>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-card__icon blue"><FaUsers /></div>
                    <div>
                        <div className="admin-stat-card__label">Total Users</div>
                        <div className="admin-stat-card__value">{loading ? "..." : stats.users.toLocaleString()}</div>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-card__icon gold"><FaBuilding /></div>
                    <div>
                        <div className="admin-stat-card__label">Total Properties</div>
                        <div className="admin-stat-card__value">{loading ? "..." : stats.total}</div>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-card__icon orange"><FaHome /></div>
                    <div>
                        <div className="admin-stat-card__label">For Sale</div>
                        <div className="admin-stat-card__value">{loading ? "..." : stats.forSale}</div>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-card__icon pink"><FaStore /></div>
                    <div>
                        <div className="admin-stat-card__label">For Rent</div>
                        <div className="admin-stat-card__value">{loading ? "..." : stats.forRent}</div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="admin-charts-row">
                <div className="admin-chart-card">
                    <h3>Property Listings by Month</h3>
                    <div className="admin-bar-chart">
                        {barData.map(b => (
                            <div key={b.month} className="admin-bar-chart__bar">
                                <div
                                    className="admin-bar-chart__fill"
                                    style={{ height: `${(b.count / maxBar) * 130}px` }}
                                />
                                <div className="admin-bar-chart__label">{b.month}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-chart-card">
                    <h3>Sales Data</h3>
                    <div className="admin-sales-list">
                        {SALES_BREAKDOWN.map(s => (
                            <div key={s.label} className="admin-sales-item">
                                <div className="admin-sales-item__top">
                                    <span>{s.label}</span>
                                    <span className="admin-sales-item__pct">{s.pct}%</span>
                                </div>
                                <div className="admin-sales-item__bar">
                                    <div className="admin-sales-item__fill" style={{ width: `${s.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Properties */}
            <div className="admin-table-card">
                <div className="admin-table-card__header">
                    <h3>Recent Properties</h3>
                    <span className="admin-table-card__badge">{stats.total} total</span>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} style={{ textAlign: "center", color: "#aaa", padding: 32 }}>Loading...</td></tr>
                        ) : properties.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: "center", color: "#aaa", padding: 32 }}>No properties yet</td></tr>
                        ) : properties.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div className="admin-table__user">
                                        {p.images?.[0]
                                            ? <img src={p.images[0]} alt="" className="admin-prop-img" />
                                            : <div className="admin-table__avatar"><FaBuilding /></div>}
                                        <div>
                                            <div className="admin-table__name">{p.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`admin-badge ${p.type}`}>{p.type}</span></td>
                                <td><span className={`admin-badge ${p.status}`}>{p.status === "sale" ? "For Sale" : "For Rent"}</span></td>
                                <td style={{ fontWeight: 700 }}>{fmt(p.price || 0)}</td>
                                <td>{p.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOverview;
