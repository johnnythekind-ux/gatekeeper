import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to upgrade." },
      { status: 401 }
    );
  }

  console.log("Creating checkout for user:", user.id);

  const priceId = process.env.STRIPE_PRO_PRICE_ID;

  if (!priceId) {
    return NextResponse.json(
      { error: "Missing STRIPE_PRO_PRICE_ID" },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    payment_method_types: ["card"],

    customer_email: user.email,

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    metadata: {
      user_id: user.id,
    },

    subscription_data: {
      metadata: {
        user_id: user.id,
      },
    },

    success_url: "http://localhost:3000/success",

    cancel_url: "http://localhost:3000/pricing",
  });

  return NextResponse.json({
    url: session.url,
  });
}