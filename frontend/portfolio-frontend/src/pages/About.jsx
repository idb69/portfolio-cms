import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import {
  getAbout,
  getSettings,
  mediaUrl,
} from "../services/api";

export default function About() {
  const [about, setAbout] = useState(null);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    Promise.all([
      getAbout(),
      getSettings(),
    ])
      .then(([aboutResponse, settingsResponse]) => {
        setAbout(aboutResponse.data);
        setSettings(settingsResponse.data || {});
      })
      .catch(() => {});
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="container-page">

        <SectionTitle
          eyebrow={settings.aboutEyebrow || "About Me"}
          title={
            settings.aboutTitle ||
            about?.title ||
            "About Me"
          }
          text={
            settings.aboutText ||
            about?.description ||
            ""
          }
        />

        <div className="glass rounded-3xl p-8">

          {about?.imageUrl && (
            <img
              src={mediaUrl(about.imageUrl)}
              alt="About"
              className="mb-6 h-64 w-full rounded-2xl object-cover"
            />
          )}

          <p className="leading-8 text-slate-400">
            {about?.description ||
              settings.aboutText ||
              ""}
          </p>

        </div>
      </div>
    </section>
  );
}