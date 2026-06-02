import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@supabase/supabase-js";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    console.log("Stripe event type:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Checkout metadata:", session.metadata);

      const userId = session.metadata?.user_id;

      const subscriptionId = session.subscription as string;

      console.log("Checkout subscription:", subscriptionId);

      if (!userId || !subscriptionId) {
        console.error("Missing metadata", {
          userId,
          subscriptionId,
          metadata: session.metadata,
        });

        return NextResponse.json(
          { error: "Missing metadata" },
          { status: 400 }
        );
      }

      const subscription =
        await stripe.subscriptions.retrieve(subscriptionId);

      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_customer_id: subscription.customer as string,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        plan: "pro",
        current_period_end: null,
        updated_at: new Date().toISOString(),
      });

      console.log("Subscription synced to Supabase");
    }

    if (event.type === "customer.subscription.updated") {
  const subscription = event.data.object as Stripe.Subscription;

  await supabase
    .from("subscriptions")
    .update({
  status: subscription.status,
  plan: subscription.status === "active" ? "pro" : "free",

  cancel_at:
    subscription.cancel_at
      ? new Date(subscription.cancel_at * 1000).toISOString()
      : null,

  cancel_at_period_end:
    subscription.cancel_at_period_end,

  updated_at: new Date().toISOString(),
})
    .eq("stripe_subscription_id", subscription.id);

  console.log("Subscription updated:", subscription.id, subscription.status);
}

if (event.type === "customer.subscription.deleted") {
  const subscription = event.data.object as Stripe.Subscription;

  await supabase
    .from("subscriptions")
    .update({
  status: "canceled",
  plan: "free",
  updated_at: new Date().toISOString(),
})
    .eq("stripe_subscription_id", subscription.id);

  console.log("Subscription canceled:", subscription.id);
}

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler failed:", error);

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}