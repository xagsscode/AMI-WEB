import { useState } from "react";
import { useNewAuth } from "../../contexts/NewAuthContext";
import AdminOverview from "./pages/AdminOverview";
import AdminAddProperty from "./pages/AdminAddProperty";
import AdminProperties from "./pages/AdminProperties";
import AdminUsers from "./pages/AdminUsers";
import {
    FaThLarge, FaPlus, FaBuilding, FaUsers, FaSignOutAlt, FaHome,
} from "react-icons/fa";
import "./Admin.css";

const NAV = [
    { id: "overview", label: "Dashboard", icon: <FaThLarge /> },
    { id: "add", label: "Add Properties", icon: <FaPlus /> },
    { id: "properties", label: "Explore Properties", icon: <FaBuilding /> },
    { id: "users", label: "Users", icon: <FaUsers /> },
];

const Admin = () => {
    const { user, signOut } = useNewAuth();
    const [page, setPage] = useState("overview");

    const renderPage = () => {
        switch (page) {
            case "overview": return <AdminOverview />;
            case "add": return <AdminAddProperty />;
            case "properties": return <AdminProperties />;
            case "users": return <AdminUsers />;
            default: return <AdminOverview />;
        }
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar__logo">
                    <div className="admin-sidebar__logo-name">AMI <span>HOMES</span></div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Admin Panel</div>
                </div>

                <nav className="admin-sidebar__nav">
                    {NAV.map((n) => (
                        <button
                            key={n.id}
                            className={`admin-nav-btn ${page === n.id ? "active" : ""}`}
                            onClick={() => setPage(n.id)}
                        >
                            {n.icon}
                            {n.label}
                        </button>
                    ))}
                </nav>

                <div className="admin-sidebar__logout">
                    <button className="admin-logout-btn" onClick={signOut}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="admin-main">
                {renderPage()}
            </main>
        </div>
    );
};

export default Admin;
