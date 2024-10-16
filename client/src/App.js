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
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Wrap useLocation inside BrowserRouter's context
  const location = useLocation();

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
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

  // Conditionally hide Navbar and Footer on the AdminDashboard page
  const hideNavbarFooter = location.pathname === "/admin";

  return (
    <div className={darkMode ? 'dark' : ''}>
      {!hideNavbarFooter && <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(prev => !prev)} />}
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
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
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
