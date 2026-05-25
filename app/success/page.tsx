export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-emerald-400">
          Payment Successful
        </p>

        <h1 className="mt-4 text-5xl font-bold">Welcome to Pro</h1>

        <p className="mt-6 text-lg text-slate-300">
          Your Stripe checkout was completed successfully. Gatekeeper will use
          webhooks next to sync this subscription into Supabase.
        </p>

        <a
          href="/dashboard"
          className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}