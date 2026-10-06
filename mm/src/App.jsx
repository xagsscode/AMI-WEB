import "./App.css";
import "./styles/theme.css";
import "./styles/ami-theme.css";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AmiHome from "./pages/AmiHome/AmiHome";
const AmiProperties = lazy(() => import("./pages/AmiProperties/AmiProperties"));
const AmiAgents = lazy(() => import("./pages/AmiAgents/AmiAgents"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy/CookiePolicy"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail/PropertyDetail"));
import Loading from "./components/Loading/Loading";

function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <Suspense fallback={<Loading message="Loading page..." />}><Routes>
      <Route path="/" element={<AmiHome />} />
      <Route path="/properties" element={<AmiProperties />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/agents" element={<AmiAgents />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></Suspense>
  );
}

export default App;
