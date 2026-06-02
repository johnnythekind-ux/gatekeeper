import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: subscription, error } = await supabase
  .from("subscriptions")
  .select("stripe_customer_id, updated_at")
  .eq("user_id", user.id)
  .order("updated_at", { ascending: false })
  .limit(1)
  .maybeSingle();

  if (error || !subscription?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No Stripe customer found" },
      { status: 400 }
    );
  }

  const appUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const portalSession = await stripe.billingPortal.sessions.create({
  customer: subscription.stripe_customer_id,
  return_url: `${appUrl}/dashboard`,
});

  return NextResponse.json({ url: portalSession.url });
}