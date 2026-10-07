import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith("/admin")) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const mediaUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

export const login = (data) => api.post("/auth/login", data);
export const getProjects = () => api.get("/projects");
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const getSkills = () => api.get("/skills");
export const createSkill = (data) => api.post("/skills", data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);
export const getExperience = () => api.get("/experience");
export const createExperience = (data) => api.post("/experience", data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);
export const getBlogs = () => api.get("/blogs");
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
export const getServices = () => api.get("/services");
export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
export const getTestimonials = () => api.get("/testimonials");
export const createTestimonial = (data) => api.post("/testimonials", data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);
export const getAbout = () => api.get("/about");
export const updateAbout = (data) => api.put("/about", data);
export const getSettings = () => api.get("/settings");
export const updateSettings = (data) => api.put("/settings", data);
export const getMessages = () => api.get("/contact");
export const markMessageRead = (id) => api.put(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);
export const uploadImage = (file) => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/upload/image", form, { headers: { "Content-Type": "multipart/form-data" } });
};
export const getMedia = () => api.get("/media");
export const deleteMedia = (id) => api.delete(`/media/${id}`);
export const sendContact = (data) => api.post("/contact", data);

export default api;
