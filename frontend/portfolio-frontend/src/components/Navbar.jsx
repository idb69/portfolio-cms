import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { getSettings } from "../services/api";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Projects", "/projects"],
  ["Experience", "/experience"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Portfolio");

  useEffect(() => {
    getSettings()
      .then((response) => {
        setName(
          response.data?.siteName || "Portfolio"
        );
      })
      .catch(() => {});
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-black gradient-text"
        >
          {name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          {links.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((previous) => !previous)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="border-t border-white/10 px-5 py-4 md:hidden">
          {links.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className="block py-2 text-sm text-slate-300 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}