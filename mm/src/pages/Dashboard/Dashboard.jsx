import { Routes, Route } from "react-router-dom";
import { useNewAuth } from "../../contexts/NewAuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import Sidebar from "../../components/Sidebar";
import { TrialBanner } from "../../components/TrialBanner";
import { AdminPermissionGate } from "../../components/AdminPermissionGate/AdminPermissionGate";
import DashboardOverview from "./pages/dashboardOverview/DashboardOverview";
import Settings from "./pages/settings/Settings";
import "./Dashboard.css";

export const Dashboard = () => {
  const { user } = useNewAuth();
  const { isDark, actualTheme } = useTheme();

  // Use the new auth system
  const currentUser = user;

  if (!currentUser) {
    return (
      <div className="dashboard-loading">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "18px",
          }}
        >
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main" data-theme={actualTheme}>
        <TrialBanner />
        <Routes>
          <Route
            index
            element={
              <AdminPermissionGate requiredFeature="Dashboard Analytics">
                <DashboardOverview />
              </AdminPermissionGate>
            }
          />
          <Route
            path="settings"
            element={
              <AdminPermissionGate requiredFeature="Settings Management">
                <Settings />
              </AdminPermissionGate>
            }
          />
        </Routes>
      </main>
    </div>
  );
};
