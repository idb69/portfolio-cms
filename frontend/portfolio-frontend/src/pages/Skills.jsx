import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import { getSkills } from "../services/api";

export default function Skills() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSkills()
      .then((response) => {
        setItems(response.data || []);
      })
      .catch(() => {});
  }, []);

  const visibleSkills = items.filter(
    (skill) => skill.published !== false
  );

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="container-page">

        <SectionTitle
          eyebrow="Skills"
          title="My Technical Skills"
          text="Skills managed from the admin CMS."
        />

        <div className="flex flex-wrap gap-3">
          {visibleSkills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300"
            >
              {skill.title || skill.name}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}