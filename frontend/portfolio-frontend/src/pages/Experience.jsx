import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import {
  getExperience,
  getSettings,
} from "../services/api";

export default function Experience() {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    Promise.all([
      getExperience(),
      getSettings(),
    ])
      .then(([experienceResponse, settingsResponse]) => {
        setItems(experienceResponse.data || []);
        setSettings(settingsResponse.data || {});
      })
      .catch(() => {});
  }, []);

  const visibleExperience = items.filter(
    (item) => item.published !== false
  );

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="container-page">

        <SectionTitle
          eyebrow="Experience"
          title={
            settings.experienceTitle ||
            "Experience & Internship"
          }
          text="My practical experience and professional learning journey."
        />

        <div className="space-y-6">
          {visibleExperience.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl p-7"
            >
              <h3 className="text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-violet-400">
                {item.company || ""}
              </p>

              <p className="mt-4 leading-7 text-slate-400">
                {item.description || ""}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}