import "./App.css";
import "./styles/theme.css";
import "./styles/ami-theme.css";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useNewAuth } from "./contexts/NewAuthContext";
import AmiHome from "./pages/AmiHome/AmiHome";
const AmiProperties = lazy(() => import("./pages/AmiProperties/AmiProperties"));
const AmiAgents = lazy(() => import("./pages/AmiAgents/AmiAgents"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy/CookiePolicy"));
const NewSignup = lazy(() => import("./pages/NewSignup/NewSignup"));
const NewLogin = lazy(() => import("./pages/NewLogin/NewLogin"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail/PropertyDetail"));
import Loading from "./components/Loading/Loading";

function App() {
  const { user, loading } = useNewAuth();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  if (loading) {
    return <Loading message="Loading AMI Smart Homes..." />;
  }

  return (
    <Suspense fallback={<Loading message="Loading page..." />}><Routes>
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></Suspense>
  );
}

export default App;
