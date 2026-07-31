import { useState, type SubmitEvent } from "react";

import { IllustratedLoginPanel } from "../../components/IllustratedLoginPanel";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
  onGoogleSignIn?: () => void;
  onCreateAccount?: () => void;
  onForgotPassword?: () => void;
}

export function Login({ onSubmit, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit?.({ email, password, remember });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070B18] flex">
      {/* ---------- Left: illustrated panel ---------- */}
      <IllustratedLoginPanel></IllustratedLoginPanel>

      {/* ---------- Right: form panel ---------- */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative ppl-body">
        <div
          className="lg:hidden absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(circle_at_20%_0%,rgba(76,201,240,0.15),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="w-full max-w-sm mx-auto relative z-10">
          {/* wordmark */}
          <div className="flex items-center gap-2 mb-10">
            <div
              className="w-8 h-8 rounded-full border border-[#4CC9F0]/60 relative flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="absolute w-full h-3 border border-[#4CC9F0]/60 rounded-[100%] -rotate-12" />
              <div className="w-3 h-3 rounded-full bg-[#4CC9F0]/70" />
            </div>
            <span className="ppl-display text-white font-bold text-lg tracking-tight">
              Pizza Planet
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-1">
            Welcome back
          </h2>
          <p className="text-[#7C89A8] text-sm mb-8">
            Sign in to continue your order.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block ppl-mono text-xs uppercase tracking-wider text-[#7C89A8] mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg bg-[#0F1830] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-[#4A5570] focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/60 focus:border-[#4CC9F0]/60 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block ppl-mono text-xs uppercase tracking-wider text-[#7C89A8]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-xs text-[#4CC9F0]/80 hover:text-[#4CC9F0] transition"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-[#0F1830] border border-white/10 px-4 py-2.5 pr-11 text-sm text-white placeholder:text-[#4A5570] focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/60 focus:border-[#4CC9F0]/60 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C89A8] hover:text-white text-xs"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-[#FF6B4A] bg-[#FF6B4A]/10 border border-[#FF6B4A]/30 rounded-md px-3 py-2"
              >
                {error}
              </p>
            )}

            <label className="flex items-center gap-2 text-sm text-[#7C89A8] pt-1">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-[#0F1830] accent-[#4CC9F0]"
              />
              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 rounded-lg bg-[#4CC9F0] text-[#070B18] font-semibold text-sm py-2.5 hover:bg-[#6ad4f4] focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/60 focus:ring-offset-2 focus:ring-offset-[#070B18] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
