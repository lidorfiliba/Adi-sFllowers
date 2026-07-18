"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "שגיאה בהתחברות");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-10"
        style={{ background: "white", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(27,67,50,0.08)" }}
          >
            <Lock size={28} style={{ color: "#1B4332" }} />
          </div>
          <h1 className="text-2xl font-black" style={{ color: "#1B4332" }}>
            כניסה לניהול
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            פרחי הרצליה — לוח בקרה
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1B4332" }}>
              סיסמה
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="הזינו את הסיסמה"
                className="w-full px-4 py-3 rounded-xl border-2 text-base transition-all focus:outline-none focus:border-green-700"
                style={{ borderColor: "#E5E7EB", direction: "ltr", paddingLeft: "3rem" }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                aria-label={show ? "הסתר סיסמה" : "הצג סיסמה"}
                style={{ color: "#9CA3AF" }}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-center" style={{ color: "#DC2626" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 rounded-2xl text-base font-bold transition-all disabled:opacity-50"
            style={{ background: "#1B4332", color: "#FFF8F0" }}
          >
            {loading ? "מתחבר..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}
