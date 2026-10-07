import { useEffect, useState } from "react";

import SectionTitle from "../components/SectionTitle";
import {
  getSettings,
  sendContact,
} from "../services/api";

export default function Contact() {
  const [settings, setSettings] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    getSettings()
      .then((response) => {
        setSettings(response.data || {});
      })
      .catch(() => {});
  }, []);

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

      setStatus("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus("Unable to send message right now.");
    }
  };

  const contactDetails = [
    settings.email,
    settings.phone,
    settings.location,
  ].filter(Boolean);

  return (
    <section className="min-h-screen pt-32 pb-24">
      <div className="container-page">

        <SectionTitle
          eyebrow="Contact"
          title={settings.contactTitle || "Get In Touch"}
          text={
            settings.contactText ||
            "Have a project or opportunity? Send me a message."
          }
        />

        {contactDetails.length > 0 && (
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {contactDetails.map((detail, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 text-sm text-slate-300"
              >
                {detail}
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={submit}
          className="glass grid gap-5 rounded-3xl p-8"
        >
          <input
            name="name"
            className="input"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="subject"
            className="input"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            rows="7"
            className="input"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-fit rounded-xl bg-white px-7 py-3 font-bold text-slate-950"
          >
            Send Message
          </button>

          {status && (
            <p className="text-sm text-slate-400">
              {status}
            </p>
          )}
        </form>

      </div>
    </section>
  );
}