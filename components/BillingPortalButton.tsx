"use client";

export default function BillingPortalButton() {
  async function handleClick() {
    const response = await fetch("/api/stripe/portal", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Could not open billing portal.");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="ml-3 inline-flex items-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
    >
      Manage Billing
    </button>
  );
}