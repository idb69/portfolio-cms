import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import {
  getBlogs,
  getSettings,
  mediaUrl,
} from "../services/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    Promise.all([
      getBlogs(),
      getSettings(),
    ])
      .then(([blogsResponse, settingsResponse]) => {
        setBlogs(blogsResponse.data || []);
        setSettings(settingsResponse.data || {});
      })
      .catch(() => {});
  }, []);

  const visibleBlogs = blogs.filter(
    (blog) => blog.published !== false
  );

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="container-page">

        <SectionTitle
          eyebrow="Blog"
          title={settings.blogTitle || "Latest Articles"}
          text="Content managed from the admin CMS."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleBlogs.map((blog) => (
            <article
              key={blog.id}
              className="glass overflow-hidden rounded-2xl"
            >

              {blog.imageUrl && (
                <img
                  src={mediaUrl(blog.imageUrl)}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6">

                <h3 className="text-xl font-bold text-white">
                  {blog.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {blog.description}
                </p>

                {blog.link && (
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-blue-400"
                  >
                    Read more →
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