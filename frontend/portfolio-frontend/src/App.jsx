import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/skills"
        element={
          <PublicLayout>
            <Skills />
          </PublicLayout>
        }
      />

      <Route
        path="/projects"
        element={
          <PublicLayout>
            <Projects />
          </PublicLayout>
        }
      />

      <Route
        path="/experience"
        element={
          <PublicLayout>
            <Experience />
          </PublicLayout>
        }
      />

      <Route
        path="/blog"
        element={
          <PublicLayout>
            <Blog />
          </PublicLayout>
        }
      />

      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}