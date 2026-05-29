import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import BillingPortalButton from "@/components/BillingPortalButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription } = await supabase
  .from("subscriptions")
  .select("plan, status, updated_at")
  .eq("user_id", user.id)
  .order("updated_at", { ascending: false })
  .limit(1)
  .maybeSingle();

  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "inactive";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-emerald-400">
          Authenticated Workspace
        </p>

        <h1 className="mt-3 text-4xl font-bold">Dashboard</h1>

        <p className="mt-4 text-slate-300">Welcome back, {user.email}</p>

        <div className="mt-6">
          <LogoutButton />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Current Plan</p>
          <p className="mt-2 text-2xl font-bold capitalize">{plan}</p>
          <p className="mt-2 text-sm text-slate-400">
            Subscription status: {status}
          </p>

<div className="mt-6 flex flex-wrap gap-3">
  {subscription?.status === "active" ? (
    <>
      <a
        href="/pro-feature"
        className="inline-flex items-center rounded-xl bg-green-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-green-400"
      >
        Access Pro Feature
      </a>

      <BillingPortalButton />
    </>
  ) : (
    <a
      href="/pricing"
      className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
    >
      Upgrade to Pro
    </a>
  )}
</div>

        </div>
      </div>
    </main>
  );
}