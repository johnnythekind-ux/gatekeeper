import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireProUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Entitlement check failed:", error);
    redirect("/pricing");
  }

  if (!subscription || subscription.status !== "active") {
    redirect("/pricing");
  }

  return {
    user,
    subscription,
    isPro: true,
  };
}