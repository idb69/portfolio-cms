import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { login } from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="glass w-full max-w-md rounded-3xl p-8">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15">
            <Lock className="text-violet-400" />
          </div>

          <h1 className="text-3xl font-black text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Portfolio CMS
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                required
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-white outline-none focus:border-violet-400"
                placeholder="Username"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Password
            </label>

            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-violet-400"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-bold text-slate-950 transition hover:bg-slate-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Secure JWT authentication
        </p>

      </div>
    </div>
  );
}