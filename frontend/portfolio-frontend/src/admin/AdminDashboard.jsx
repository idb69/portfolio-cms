import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, FolderKanban, Code2, Briefcase, FileText, Mail,
  LogOut, Plus, Trash2, Pencil, X, Settings, Wrench, MessageSquare,
  Image as ImageIcon, Check, Upload, Eye
} from "lucide-react";
import {
  getProjects, createProject, updateProject, deleteProject,
  getSkills, createSkill, updateSkill, deleteSkill,
  getExperience, createExperience, updateExperience, deleteExperience,
  getBlogs, createBlog, updateBlog, deleteBlog,
  getServices, createService, updateService, deleteService,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getAbout, updateAbout, getSettings, updateSettings,
  getMessages, markMessageRead, deleteMessage,
  uploadImage, getMedia, deleteMedia, mediaUrl
} from "../services/api";

const sections = [
  ["dashboard", "Dashboard", LayoutDashboard], ["settings", "Site Settings", Settings],
  ["about", "About", FileText], ["projects", "Projects", FolderKanban],
  ["skills", "Skills", Code2], ["experience", "Experience", Briefcase],
  ["services", "Services", Wrench], ["testimonials", "Testimonials", MessageSquare],
  ["blogs", "Blogs", FileText], ["media", "Media", ImageIcon], ["messages", "Messages", Mail]
];

const configs = {
  projects: { title: "Projects", fields: ["title", "description", "imageUrl", "link", "sortOrder", "published"], create: createProject, update: updateProject, remove: deleteProject },
  skills: { title: "Skills", fields: ["title", "description", "imageUrl", "link", "sortOrder", "published"], create: createSkill, update: updateSkill, remove: deleteSkill },
  experience: { title: "Experience", fields: ["title", "company", "description", "imageUrl", "link", "sortOrder", "published"], create: createExperience, update: updateExperience, remove: deleteExperience },
  services: { title: "Services", fields: ["title", "description", "imageUrl", "link", "sortOrder", "published"], create: createService, update: updateService, remove: deleteService },
  testimonials: { title: "Testimonials", fields: ["title", "description", "imageUrl", "link", "sortOrder", "published"], create: createTestimonial, update: updateTestimonial, remove: deleteTestimonial },
  blogs: { title: "Blogs", fields: ["title", "description", "imageUrl", "link", "sortOrder", "published"], create: createBlog, update: updateBlog, remove: deleteBlog }
};

const emptyItem = (fields) => Object.fromEntries(fields.map((f) => [f, f === "sortOrder" ? 0 : f === "published" ? true : ""]));

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState({ projects: [], skills: [], experience: [], services: [], testimonials: [], blogs: [], messages: [], media: [] });
  const [about, setAbout] = useState({ title: "", description: "", imageUrl: "" });
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const [projects, skills, experience, services, testimonials, blogs, messages, media, aboutRes, settingsRes] = await Promise.all([
        getProjects(), getSkills(), getExperience(), getServices(), getTestimonials(), getBlogs(), getMessages(), getMedia(), getAbout(), getSettings()
      ]);
      setData({ projects: projects.data || [], skills: skills.data || [], experience: experience.data || [], services: services.data || [], testimonials: testimonials.data || [], blogs: blogs.data || [], messages: messages.data || [], media: media.data || [] });
      setAbout(aboutRes.data || { title: "", description: "", imageUrl: "" });
      setSettings(settingsRes.data || {});
    } catch (e) { setError(e.response?.data?.message || e.message || "Unable to load CMS data."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const logout = () => { localStorage.clear(); window.location.href = "/admin/login"; };
  const counts = useMemo(() => Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.length])), [data]);

  const saveEntity = async (section, item) => {
    const cfg = configs[section]; setSaving(true);
    try { if (item.id) await cfg.update(item.id, item); else await cfg.create(item); setEditor(null); await load(); }
    catch (e) { alert(e.response?.data?.message || "Unable to save record."); }
    finally { setSaving(false); }
  };

  const removeEntity = async (section, id) => {
    if (!confirm("Delete this record?")) return;
    try { await configs[section].remove(id); await load(); } catch (e) { alert("Unable to delete record."); }
  };

  const saveAbout = async () => { setSaving(true); try { await updateAbout(about); await load(); } catch { alert("Unable to save About."); } finally { setSaving(false); } };
  const saveSettings = async () => { setSaving(true); try { await updateSettings(settings); await load(); } catch { alert("Unable to save site settings."); } finally { setSaving(false); } };

  return <div className="min-h-screen bg-slate-950 text-slate-100">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-slate-950 md:block">
      <div className="border-b border-white/10 p-6"><h1 className="text-xl font-black gradient-text">Portfolio CMS</h1><p className="mt-1 text-xs text-slate-500">No-code content manager</p></div>
      <nav className="space-y-1 overflow-y-auto p-3" style={{maxHeight:"calc(100vh - 150px)"}}>{sections.map(([id, text, Icon]) => <MenuButton key={id} icon={Icon} text={text} active={active === id} onClick={() => setActive(id)} />)}</nav>
      <button onClick={logout} className="absolute bottom-4 left-3 right-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"><LogOut size={18}/>Logout</button>
    </aside>
    <main className="md:ml-64">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur-xl"><div className="flex items-center justify-between"><div><p className="text-xs text-slate-500">Logged in as</p><h2 className="font-bold">{localStorage.getItem("username") || "Admin"}</h2></div><a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"><Eye size={16}/> View Site</a></div></header>
      <div className="p-5 md:p-8">
        {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}
        {loading ? <div className="glass rounded-2xl p-10 text-center text-slate-400">Loading CMS...</div> : <>
          {active === "dashboard" && <Dashboard counts={counts} onSelect={setActive}/>} 
          {active === "settings" && <SettingsEditor value={settings} setValue={setSettings} onSave={saveSettings} saving={saving} onUpload={async f => { const r = await uploadImage(f); setSettings(s => ({...s, profileImageUrl:r.data.url})); }} />}
          {active === "about" && <AboutEditor value={about} setValue={setAbout} onSave={saveAbout} saving={saving} onUpload={async f => { const r = await uploadImage(f); setAbout(s => ({...s, imageUrl:r.data.url})); }} />}
          {configs[active] && <EntityManager section={active} items={data[active]} onAdd={() => setEditor({section: active, item: emptyItem(configs[active].fields)})} onEdit={item => setEditor({section: active, item: {...item}})} onDelete={id => removeEntity(active, id)} />}
          {active === "media" && <MediaManager items={data.media} onUpload={async f => { try { await uploadImage(f); await load(); } catch { alert("Image upload failed."); } }} onDelete={async id => { if(confirm("Delete image?")){await deleteMedia(id); await load();}}} />}
          {active === "messages" && <MessagesManager items={data.messages} onRead={async id => { await markMessageRead(id); await load(); }} onDelete={async id => { if(confirm("Delete message?")){await deleteMessage(id); await load();}}} />}
        </>}
      </div>
    </main>
    {editor && <EntityModal section={editor.section} item={editor.item} setItem={item => setEditor(e => ({...e, item}))} onClose={() => setEditor(null)} onSave={() => saveEntity(editor.section, editor.item)} saving={saving} onUpload={async f => { const r = await uploadImage(f); setEditor(e => ({...e, item:{...e.item, imageUrl:r.data.url}})); }} />}
  </div>;
}

function MenuButton({icon: Icon, text, active, onClick}) { return <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm ${active ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={17}/>{text}</button>; }
function Dashboard({counts, onSelect}) { const cards=[['projects','Projects',FolderKanban],['skills','Skills',Code2],['experience','Experience',Briefcase],['services','Services',Wrench],['testimonials','Testimonials',MessageSquare],['blogs','Blogs',FileText],['media','Media',ImageIcon],['messages','Messages',Mail]]; return <div><div className="mb-8"><p className="text-sm uppercase tracking-widest text-violet-400">Content management</p><h1 className="mt-2 text-3xl font-black">Dashboard</h1><p className="mt-2 text-slate-400">Edit portfolio content, upload images and publish changes without touching code.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([id,n,I])=><button key={id} onClick={()=>onSelect(id)} className="glass rounded-2xl p-5 text-left hover:border-violet-400/30"><I className="text-violet-400" size={23}/><p className="mt-4 text-sm text-slate-500">{n}</p><p className="mt-1 text-3xl font-black">{counts[id]||0}</p></button>)}</div></div>; }

function EntityManager({section, items, onAdd, onEdit, onDelete}) { const cfg=configs[section]; return <div><div className="mb-7 flex items-center justify-between"><div><p className="text-sm uppercase tracking-widest text-violet-400">CMS</p><h1 className="mt-2 text-3xl font-black">{cfg.title}</h1></div><button onClick={onAdd} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950"><Plus size={17}/> Add</button></div><div className="grid gap-4 lg:grid-cols-2">{items.map(item=><div key={item.id} className="glass rounded-2xl p-5"><div className="flex gap-4">{item.imageUrl && <img src={mediaUrl(item.imageUrl)} className="h-20 w-20 rounded-xl object-cover"/>}<div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{item.title || "Untitled"}</h3><span className={`rounded-full px-2 py-1 text-[11px] ${item.published === false ? "bg-red-500/10 text-red-300" : "bg-green-500/10 text-green-300"}`}>{item.published === false ? "Draft" : "Published"}</span></div><p className="mt-2 line-clamp-3 text-sm text-slate-400">{item.description || "No description"}</p></div></div><div className="mt-4 flex gap-2"><button onClick={()=>onEdit(item)} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm"><Pencil size={14}/>Edit</button><button onClick={()=>onDelete(item.id)} className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400"><Trash2 size={14}/>Delete</button></div></div>)}</div>{!items.length&&<Empty/>}</div>; }

function EntityModal({section,item,setItem,onClose,onSave,saving,onUpload}) { const cfg=configs[section]; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"><div className="glass max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-2xl font-bold">{item.id ? "Edit" : "Add"} {cfg.title.slice(0,-1)}</h2><p className="text-xs text-slate-500">All changes are stored in the database.</p></div><button onClick={onClose}><X/></button></div><div className="space-y-4">{cfg.fields.map(field => field === "description" ? <Field key={field} label="Description" textarea value={item[field]||""} onChange={v=>setItem({...item,[field]:v})}/> : field === "published" ? <label key={field} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={item[field] !== false} onChange={e=>setItem({...item,published:e.target.checked})}/> Published</label> : <Field key={field} label={labelize(field)} type={field === "sortOrder" ? "number" : "text"} value={item[field] ?? ""} onChange={v=>setItem({...item,[field]:field === "sortOrder" ? Number(v) : v})}/>)}{cfg.fields.includes("imageUrl") && <div className="rounded-xl border border-dashed border-white/15 p-4"><label className="mb-2 block text-sm text-slate-400">Replace image</label><input type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&onUpload(e.target.files[0])} className="text-sm text-slate-400"/>{item.imageUrl && <img src={mediaUrl(item.imageUrl)} className="mt-3 h-32 w-full rounded-xl object-cover"/>}</div>}<div className="flex gap-3 pt-2"><button disabled={saving} onClick={onSave} className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950 disabled:opacity-50">{saving?"Saving...":"Save Changes"}</button><button onClick={onClose} className="rounded-xl border border-white/10 px-5 py-3">Cancel</button></div></div></div></div>; }

function AboutEditor({value,setValue,onSave,saving,onUpload}) { return <div><h1 className="mb-7 text-3xl font-black">About</h1><div className="glass max-w-3xl rounded-2xl p-6 space-y-4"><Field label="Title" value={value.title||""} onChange={v=>setValue({...value,title:v})}/><Field label="Description" textarea value={value.description||""} onChange={v=>setValue({...value,description:v})}/><Field label="Image URL" value={value.imageUrl||""} onChange={v=>setValue({...value,imageUrl:v})}/><input type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&onUpload(e.target.files[0])} className="text-sm text-slate-400"/>{value.imageUrl&&<img src={mediaUrl(value.imageUrl)} className="h-40 w-full rounded-xl object-cover"/>}<button disabled={saving} onClick={onSave} className="rounded-xl bg-white px-6 py-3 font-bold text-slate-950">{saving?"Saving...":"Save About"}</button></div></div>; }

const settingGroups = [
  ["Hero", ["siteName","heroGreeting","heroTitle","heroDescription","profileImageUrl","resumeUrl","githubUrl","linkedinUrl"]],
  ["Contact", ["email","phone","location"]],
  ["Sections", ["aboutEyebrow","aboutTitle","aboutText","skillsTitle","projectsTitle","projectsText","experienceTitle","blogTitle","servicesTitle","contactTitle","contactText"]]
];
function SettingsEditor({value,setValue,onSave,saving,onUpload}) { return <div><h1 className="mb-7 text-3xl font-black">Site Settings</h1><div className="max-w-4xl space-y-5">{settingGroups.map(([group,fields])=><div key={group} className="glass rounded-2xl p-6"><h2 className="mb-5 text-xl font-bold">{group}</h2><div className="grid gap-4 md:grid-cols-2">{fields.map(f=><Field key={f} label={labelize(f)} textarea={f.includes("Description")||f.endsWith("Text")} value={value[f]||""} onChange={v=>setValue({...value,[f]:v})}/>)}</div>{group==="Hero"&&<><div className="mt-4 flex flex-wrap gap-3"><input type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&onUpload(e.target.files[0])} className="text-sm text-slate-400"/></div>{value.profileImageUrl&&<img src={mediaUrl(value.profileImageUrl)} className="mt-3 h-40 w-40 rounded-2xl object-cover"/>}</>}</div>)}<button disabled={saving} onClick={onSave} className="rounded-xl bg-white px-6 py-3 font-bold text-slate-950">{saving?"Saving...":"Save Site Settings"}</button></div></div>; }

function MediaManager({items,onUpload,onDelete}) { return <div><div className="mb-7 flex items-center justify-between"><div><h1 className="text-3xl font-black">Media Library</h1><p className="mt-2 text-slate-400">Upload once and reuse images across your content.</p></div><label className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950"><Upload size={16}/> Upload<input hidden type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&onUpload(e.target.files[0])}/></label></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(m=><div key={m.id} className="glass overflow-hidden rounded-2xl"><img src={mediaUrl(m.url)} className="h-44 w-full object-cover"/><div className="p-3"><p className="truncate text-sm">{m.originalName}</p><button onClick={()=>onDelete(m.id)} className="mt-3 flex items-center gap-2 text-xs text-red-400"><Trash2 size={13}/>Delete</button></div></div>)}</div>{!items.length&&<Empty/>}</div>; }
function MessagesManager({items,onRead,onDelete}) { return <div><h1 className="mb-7 text-3xl font-black">Messages</h1><div className="space-y-3">{items.map(m=><div key={m.id} className="glass rounded-2xl p-5"><div className="flex items-start justify-between gap-4"><div><p className="font-bold">{m.name} <span className="text-sm font-normal text-slate-500">{m.email}</span></p><p className="mt-2 text-violet-300">{m.subject || "No subject"}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">{m.message}</p></div>{m.read&&<span className="text-xs text-green-400">Read</span>}</div><div className="mt-4 flex gap-2">{!m.read&&<button onClick={()=>onRead(m.id)} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs"><Check size={14}/>Mark read</button>}<button onClick={()=>onDelete(m.id)} className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400"><Trash2 size={14}/>Delete</button></div></div>)}</div>{!items.length&&<Empty/>}</div>; }
function Field({label,value,onChange,textarea=false,type="text"}) { return <div><label className="mb-2 block text-sm text-slate-400">{label}</label>{textarea?<textarea rows={5} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-violet-400"/>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-violet-400"/>}</div>; }
function Empty(){return <div className="glass rounded-2xl p-10 text-center text-slate-500">No records found.</div>;}
function labelize(s){return s.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());}
