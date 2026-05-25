"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful. Check your email if confirmation is enabled.");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="text-4xl font-bold">Create your account</h1>

        <p className="mt-4 text-slate-300">
          Sign up to manage your Gatekeeper subscription and usage limits.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-950"
          >
            Create account
          </button>
        </form>
      </div>
    </main>
  );
}