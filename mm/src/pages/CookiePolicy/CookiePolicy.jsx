import AmiNavbar from "../../components/AmiNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaCookie } from "react-icons/fa";
import "./CookiePolicy.css";
;

// Custom hook for scroll animations
const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const policyData = {
  title: "AMI Smart Homes – Cookie Policy",
  lastUpdated: "28th January 2026",
  sections: [
    {
      title: "Introduction",
      content:
        'This Cookie Policy explains how AMI Smart Homes ("we", "us", or "our") uses cookies and similar technologies when you visit or use our website and application (the "Service"). By continuing to use AMI Smart Homes, you consent to the use of cookies as described in this policy.',
    },
    {
      title: "1. What Are Cookies?",
      content:
        "Cookies are small text files stored on your device (computer, phone, tablet) when you visit a website or use an app. They help improve functionality, security, and user experience.",
    },
    {
      title: "2. How We Use Cookies",
      content: "AMI Smart Homes uses cookies to:",
      list: [
        "Ensure the platform functions properly",
        "Remember your browsing preferences",
        "Improve performance and speed",
        "Analyze usage patterns to improve features",
        "Enhance security and prevent fraud",
      ],
    },
    {
      title: "Cookie Benefits",
      content: "Cookies help us provide a smooth and reliable experience.",
    },
    {
      title: "3. Types of Cookies We Use",
      content:
        "AMI Smart Homes uses several types of cookies to enhance your experience:",
    },
    {
      title: "a. Essential Cookies",
      content:
        "These cookies are required for the platform to function properly. Without them, core features such as navigation and preferences may not work. These cookies cannot be disabled.",
    },
    {
      title: "b. Performance & Analytics Cookies",
      content:
        "These cookies help us understand how users interact with AMI Smart Homes by collecting anonymized usage data such as:",
      list: ["Pages visited", "Feature usage", "Error reports"],
    },
    {
      title: "Analytics Purpose",
      content: "This data helps us improve the platform.",
    },
    {
      title: "c. Functionality Cookies",
      content: "These cookies remember your preferences, such as:",
      list: ["Language", "Saved settings", "User interface choices"],
    },
    {
      title: "Functionality Benefits",
      content: "They improve convenience and personalization.",
    },
    {
      title: "d. Third-Party Cookies",
      content:
        "Some cookies may be placed by trusted third-party services we use for:",
      list: ["Analytics", "Payment processing", "Security monitoring"],
    },
    {
      title: "Third-Party Disclaimer",
      content:
        "AMI Smart Homes does not control these third-party cookies and is not responsible for their privacy practices.",
    },
    {
      title: "4. What Cookies We Do NOT Use",
      content: "AMI Smart Homes does not:",
      list: [
        "Sell cookie data to advertisers",
        "Use cookies for aggressive ad tracking",
        "Track users outside the platform for marketing without consent",
      ],
    },
    {
      title: "5. Managing Cookies",
      content: "You can control or disable cookies through:",
      list: ["Your browser settings", "Device preferences"],
    },
    {
      title: "Cookie Management Warning",
      content:
        "Please note: Disabling certain cookies may affect the functionality and performance of AMI Smart Homes.",
    },
    {
      title: "6. Changes to This Cookie Policy",
      content:
        "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the Service means you accept the updated policy.",
    },
    {
      title: "7. Contact Us",
      content:
        "If you have any questions about this Cookie Policy, please contact us:",
      list: [
        "📧 Email: info@amismarthomes.com",
        "📞 Phone/WhatsApp: +2349023124709",
      ],
    },
  ],
};

const getCookieTypeBadge = (title) => {
  if (title.toLowerCase().includes("essential")) {
    return <span className="cookie_badge cookie_badge-required">Required</span>;
  }
  if (title.toLowerCase().includes("analytics")) {
    return (
      <span className="cookie_badge cookie_badge-analytics">Analytics</span>
    );
  }
  if (title.toLowerCase().includes("marketing")) {
    return (
      <span className="cookie_badge cookie_badge-marketing">Marketing</span>
    );
  }
  return null;
};

const CookiePolicy = () => {
  const navigate = useNavigate();

  useScrollAnimation();

  return (
    <div className="ami-page cookie_page" style={{ paddingTop: 96 }}>
      <AmiNavbar />

      <div className="cookie_container">
        {/* Header */}
        <div className="cookie_header">
          <button className="cookie_back-btn" onClick={() => navigate("/")}>
            <FaArrowLeft size={16} />
            Back to Home
          </button>

          <div className="cookie_title-section">
            <div className="cookie_title-wrapper">
              <FaCookie className="cookie_title-icon" />
              <h1 className="cookie_title">{policyData.title}</h1>
            </div>
            <div className="cookie_last-updated">
              <FaCalendarAlt size={16} />
              <span>Last updated: {policyData.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="cookie_content-card">
          <div className="cookie_content-header">
            <h2 className="cookie_content-title">How We Use Cookies</h2>
            <p className="cookie_content-subtitle">
              This policy explains what cookies are, how we use them, and how
              you can manage your cookie preferences.
            </p>
          </div>
          <div className="cookie_content-body">
            {policyData.sections.map((section, index) => (
              <div key={index} className="cookie_section">
                <div className="cookie_section-title-wrapper">
                  <h3 className="cookie_section-title">{section.title}</h3>
                  {getCookieTypeBadge(section.title)}
                </div>
                <p className="cookie_section-content">{section.content}</p>
                {section.list && section.list.length > 0 && (
                  <ul className="cookie_section-list">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex} className="cookie_list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {index < policyData.sections.length - 1 && (
                  <div className="cookie_section-separator" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Management Info */}
        <div className="cookie_management-card">
          <div className="cookie_management-content">
            <FaCookie className="cookie_management-icon" />
            <div>
              <h3 className="cookie_management-title">Cookie Management</h3>
              <p className="cookie_management-text">
                You can manage your cookie preferences through your browser
                settings. Most browsers allow you to view, delete, and block
                cookies. However, please note that blocking certain cookies may
                affect the functionality of our website.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cookie_footer">
          <p className="cookie_footer-text">
            If you have any questions about our use of cookies, please feel free
            to contact us.
          </p>
          <div className="cookie_footer-buttons">
            <button
              className="cookie_btn-outline"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
            <button
              className="cookie_btn-primaryy"
              onClick={() => navigate("/")}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
