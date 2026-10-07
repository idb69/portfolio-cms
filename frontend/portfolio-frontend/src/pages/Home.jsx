import { useEffect, useState } from "react";

import {
  ArrowRight,
  Code2,
  Database,
  Mail,
  Server,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";

import {
  getAbout,
  getBlogs,
  getExperience,
  getProjects,
  getServices,
  getSkills,
  getTestimonials,
  getSettings,
  sendContact,
  mediaUrl,
} from "../services/api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [about, setAbout] = useState(null);
  const [services, setServices] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    const results = await Promise.allSettled([
      getProjects(),
      getSkills(),
      getExperience(),
      getBlogs(),
      getAbout(),
      getServices(),
      getTestimonials(),
      getSettings(),
    ]);

    const [
      projectsResponse,
      skillsResponse,
      experienceResponse,
      blogsResponse,
      aboutResponse,
      servicesResponse,
      ,
      settingsResponse,
    ] = results;

    if (projectsResponse.status === "fulfilled") {
      setProjects(projectsResponse.value.data || []);
    }

    if (skillsResponse.status === "fulfilled") {
      setSkills(skillsResponse.value.data || []);
    }

    if (experienceResponse.status === "fulfilled") {
      setExperience(experienceResponse.value.data || []);
    }

    if (blogsResponse.status === "fulfilled") {
      setBlogs(blogsResponse.value.data || []);
    }

    if (aboutResponse.status === "fulfilled") {
      setAbout(aboutResponse.value.data);
    }

    if (servicesResponse.status === "fulfilled") {
      setServices(servicesResponse.value.data || []);
    }

    if (settingsResponse.status === "fulfilled") {
      setSettings(settingsResponse.value.data || {});
    }
  };

  const visibleProjects = projects
    .filter((project) => project.published !== false)
    .sort(
      (a, b) =>
        (a.sortOrder || 0) -
        (b.sortOrder || 0)
    )
    .slice(0, 6);

  const visibleSkills = skills
    .filter((skill) => skill.published !== false)
    .sort(
      (a, b) =>
        (a.sortOrder || 0) -
        (b.sortOrder || 0)
    );

  const visibleExperience = experience.filter(
    (item) => item.published !== false
  );

  const visibleBlogs = blogs
    .filter((blog) => blog.published !== false)
    .slice(0, 6);

  const visibleServices = services
    .filter((service) => service.published !== false)
    .slice(0, 6);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.25fr_.75fr] lg:items-center">

          {/* Hero Content */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[.3em] text-violet-400">
              {settings.heroGreeting || "Hello, I am"}
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {settings.heroTitle ||
                "Welcome to my portfolio."}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              {settings.heroDescription ||
                about?.description ||
                ""}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-semibold text-white-44">
                View Projects
                <ArrowRight size={18} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-semibold text-white"
              >
                Contact Me
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Hero Profile Card */}
          <div className="glass rounded-3xl p-7 shadow-2xl">

            {settings.profileImageUrl ? (
              <img
                src={mediaUrl(
                  settings.profileImageUrl
                )}
                alt="Profile"
                className="mb-6 h-48 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
                  <Code2 />
                </div>

                <div>
                  <p className="font-bold text-white">
                    {settings.siteName ||
                      "Developer Profile"}
                  </p>

                  <p className="text-sm text-slate-500">
                    Java • Spring Boot • React
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <TechCard
                icon={Server}
                title="Backend"
                value="Spring Boot & REST APIs"
              />

              <TechCard
                icon={Database}
                title="Database"
                value="MySQL / SQL"
              />

              <TechCard
                icon={Code2}
                title="Frontend"
                value="React & modern UI"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24">
        <div className="container-page">
          <SectionTitle
            eyebrow={
              settings.aboutEyebrow || "About"
            }
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
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section
        id="skills"
        className="bg-white/[.025] py-24"
      >
        <div className="container-page">

          <SectionTitle
            eyebrow="Skills"
            title={
              settings.skillsTitle || "Skills"
            }
          />

          <div className="flex flex-wrap gap-3">
            {visibleSkills.map((skill, index) => (
              <span
                key={skill.id || index}
                className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300"
              >
                {skill.name ||
                  skill.title ||
                  "Skill"}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-24">
        <div className="container-page">

          <SectionTitle
            eyebrow="Projects"
            title={
              settings.projectsTitle ||
              "Selected Work"
            }
            text={settings.projectsText || ""}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                className="glass overflow-hidden rounded-2xl"
              >
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-500/20 to-violet-500/20">

                  {project.imageUrl ? (
                    <img
                      src={mediaUrl(
                        project.imageUrl
                      )}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Code2
                      size={48}
                      className="text-violet-300/70"
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400"
                    >
                      View Project
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section
        id="experience"
        className="bg-white/[.025] py-24"
      >
        <div className="container-page">

          <SectionTitle
            eyebrow="Experience"
            title={
              settings.experienceTitle ||
              "Experience & Learning Journey"
            }
          />

          <div className="space-y-5">
            {visibleExperience.map((item) => (
              <div
                key={item.id}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white">
                  {item.title ||
                    "Experience"}
                </h3>

                <p className="mt-1 text-sm text-violet-400">
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

      {/* ================= BLOG ================= */}
      <section id="blog" className="py-24">
        <div className="container-page">

          <SectionTitle
            eyebrow="Blog"
            title={
              settings.blogTitle ||
              "Latest Articles"
            }
          />

          {visibleBlogs.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-slate-400">
              No blog posts yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {blog.description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      {visibleServices.length > 0 && (
        <section className="bg-white/[.025] py-24">
          <div className="container-page">

            <SectionTitle
              eyebrow="Services"
              title={
                settings.servicesTitle ||
                "What I Can Build"
              }
            />

            <div className="grid gap-5 md:grid-cols-3">
              {visibleServices.map((service) => (
                <div
                  key={service.id}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="font-bold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {service.description ||
                      ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24">
        <div className="container-page">

          <SectionTitle
            eyebrow="Contact"
            title={
              settings.contactTitle ||
              "Let's Build Something Useful."
            }
            text={
              settings.contactText || ""
            }
          />

          <ContactForm />
        </div>
      </section>
    </>
  );
}


/* =====================================================
   TECH CARD
===================================================== */

function TechCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-4">

      <Icon
        className="text-blue-400"
        size={22}
      />

      <div>
        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="text-sm text-slate-500">
          {value}
        </p>
      </div>

    </div>
  );
}


/* =====================================================
   CONTACT FORM
===================================================== */

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      await sendContact(form);

      setStatus(
        "Message sent successfully."
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setStatus(
        "Unable to send message right now."
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="glass grid gap-5 rounded-3xl p-6 sm:p-8 md:grid-cols-2"
    >
      <input
        name="name"
        className="input"
        placeholder="Your name"
        required
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        className="input"
        placeholder="Email address"
        required
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="subject"
        className="input md:col-span-2"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <textarea
        name="message"
        rows="6"
        className="input md:col-span-2"
        placeholder="Your message"
        required
        value={form.message}
        onChange={handleChange}
      />

      <div className="flex items-center gap-3 md:col-span-2">

        <button
          className="rounded-xl bg-white px-6 py-3 font-bold text-slate-950"
          type="submit"
        >
          Send Message
        </button>

        <span className="text-sm text-slate-400">
          {status}
        </span>

      </div>
    </form>
  );
}