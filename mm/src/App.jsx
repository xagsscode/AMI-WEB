import "./App.css";
import "./styles/theme.css";
import "./styles/ami-theme.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useNewAuth } from "./contexts/NewAuthContext";
import AmiHome from "./pages/AmiHome/AmiHome";
import AmiProperties from "./pages/AmiProperties/AmiProperties";
import AmiAgents from "./pages/AmiAgents/AmiAgents";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy/CookiePolicy";
import NewSignup from "./pages/NewSignup/NewSignup";
import NewLogin from "./pages/NewLogin/NewLogin";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Admin from "./pages/Admin/Admin";
import PropertyDetail from "./pages/PropertyDetail/PropertyDetail";
import Loading from "./components/Loading/Loading";

function App() {
  const { user, loading } = useNewAuth();

  if (loading) {
    return <Loading message="Loading AMI Smart Homes..." />;
  }

  return (
    <Routes>
      <Route path="/" element={<AmiHome />} />
      <Route path="/properties" element={user ? <AmiProperties /> : <Navigate to="/login" />} />
      <Route path="/properties/:id" element={user ? <PropertyDetail /> : <Navigate to="/login" />} />
      <Route path="/agents" element={user ? <AmiAgents /> : <Navigate to="/login" />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/login" element={!user ? <NewLogin /> : <Navigate to={user.isAdmin ? "/admin" : "/"} />} />
      <Route path="/signup" element={!user ? <NewSignup /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/*" element={user?.isAdmin ? <Admin /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
