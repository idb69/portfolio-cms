import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import { getProjects, mediaUrl } from "../services/api";

export default function Projects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProjects()
      .then((response) => {
        setItems(response.data || []);
      })
      .catch(() => {});
  }, []);

  const visibleProjects = items.filter(
    (project) => project.published !== false
  );

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="container-page">

        <SectionTitle
          eyebrow="Projects"
          title="My Projects"
          text="Projects managed from the admin CMS."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="glass overflow-hidden rounded-2xl"
            >
              {project.imageUrl && (
                <img
                  src={mediaUrl(project.imageUrl)}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {project.description}
                </p>

                {project.link && (
                  <a
                    className="mt-4 inline-block text-blue-400"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open project →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}