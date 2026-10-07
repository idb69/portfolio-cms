import { useEffect, useState } from "react";

import { getSettings } from "../services/api";

export default function Footer() {
  const [name, setName] = useState("My Portfolio");

  useEffect(() => {
    getSettings()
      .then((response) => {
        setName(
          response.data?.siteName ||
            "My Portfolio"
        );
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-page flex flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">

        <p>
          © {new Date().getFullYear()} {name}.
          All rights reserved.
        </p>

        <p>
          Built with React & Spring Boot
        </p>

      </div>
    </footer>
  );
}