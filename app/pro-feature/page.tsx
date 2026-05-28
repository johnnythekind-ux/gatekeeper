import { requireProUser } from "@/lib/entitlements";

export default async function ProFeaturePage() {
  const { user } = await requireProUser();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm text-green-400">Pro Access Confirmed</p>

        <h1 className="mt-3 text-3xl font-bold">Pro Feature</h1>

        <p className="mt-4 text-white/70">
          This page is only visible to users with an active Pro subscription.
        </p>

        <p className="mt-6 text-sm text-white/50">
          Signed in as: {user.email}
        </p>
      </div>
    </main>
  );
}