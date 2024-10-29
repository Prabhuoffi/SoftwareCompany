// App.js
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Service from "./pages/Service";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import Partners from "./pages/Partner";
import FAQ from "./pages/FAQ";
import Footer from "./components/Footer";
import SplashScreen from "./Rought/Splashscreen";
import { useEffect, useState } from "react";
import Register from "./auth/Register";
import Login from "./auth/Login";
import HRDashboard from "./admin/HRDashboard";
import LandingServiceDashboard from "./admin-dashboard/landingPage/LandingServiceDashboard";
import Sidebar from "./admin-dashboard/Sidebar";
import Header from "./admin-dashboard/Header";
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import LandingTestimonialDashboard from "./admin-dashboard/landingPage/LandingTestimonialDashboard";
import LandingFeatureDashboard from "./admin-dashboard/landingPage/LandingDashFeatureboard";
import BlogPage from "./admin-dashboard/blog/BlogPage";
import FAQPage from "./admin-dashboard/faq/faqPagedashboard";
import AboutPagedashboard from "./admin-dashboard/about/AboutPagedashboard";
import PartnerPagedashboard from "./admin-dashboard/partners/PartnerPagedashboard";
import ContactPagedashboard from "./admin-dashboard/contact/ContactPagedashboard";
import NotFound from "./Rought/NotFound";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();


  
  const isDashboardRoute =
    location.pathname.startsWith("/admin-dashboard")



  const hideNavbarFooter =
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/hr-dashboard" ||
    location.pathname === "/admin-dashboard/services"||
    location.pathname === "/admin-dashboard/feature"||
    location.pathname === "/admin-dashboard/testimonials"||
    location.pathname === "/admin-dashboard/blog"||
    location.pathname === "/admin-dashboard/faq"||
    location.pathname === "/admin-dashboard/about"||
    location.pathname === "/admin-dashboard/partner"||
    location.pathname === "/admin-dashboard/contact";





  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Show Navbar only if not on an admin*/}
      {!hideNavbarFooter && (
        <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode((prev) => !prev)} />
      )}

      {/* Admin Dashboard Layout */}
      <div className={isDashboardRoute ? "flex" : ""}>
        {isDashboardRoute && <Sidebar />} 
        <div className={isDashboardRoute ? "flex-1" : ""}>
          {isDashboardRoute && <Header />} 

          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="*" element={<NotFound />} /> 

            {/* Admin/HR Dashboard Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
            <Route path="/admin-dashboard/services" element={<LandingServiceDashboard />} />
            <Route path="/admin-dashboard/testimonials" element={<LandingTestimonialDashboard />} />
            <Route path="/admin-dashboard/feature" element={<LandingFeatureDashboard />} />
            <Route path="/admin-dashboard/blog" element={<BlogPage />} />
            <Route path="/admin-dashboard/faq" element={<FAQPage />} />
            <Route path="/admin-dashboard/about" element={<AboutPagedashboard />} />
            <Route path="/admin-dashboard/partner" element={<PartnerPagedashboard />} />
            <Route path="/admin-dashboard/contact" element={<ContactPagedashboard />} />
          </Routes>
        </div>
      </div>

      {/* Show Footer only if not on an admin/HR dashboard */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
