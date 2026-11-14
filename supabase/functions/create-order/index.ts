import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

const sha256Hex = async (value: string) =>
  toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));

const createAccessToken = () => toHex(crypto.getRandomValues(new Uint8Array(32)).buffer);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const vin = typeof body?.vin === "string" ? body.vin.replace(/[\s-]/g, "").toUpperCase() : "";
    const packageId = typeof body?.packageId === "string" ? body.packageId : "";

    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }
    if (!VIN_PATTERN.test(vin)) {
      return json({ error: "Please enter a valid 17-character VIN." }, 400);
    }
    if (body?.acceptedTerms !== true) {
      return json({ error: "Please accept the terms to continue." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: pkg, error: pkgError } = await supabase
      .from("packages")
      .select("id, price_cents, currency")
      .eq("id", packageId)
      .eq("active", true)
      .maybeSingle();
    if (pkgError) throw pkgError;
    if (!pkg) {
      return json({ error: "The selected package is not available." }, 400);
    }

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .upsert({ email }, { onConflict: "email_normalized" })
      .select("id")
      .single();
    if (customerError) throw customerError;

    const accessToken = createAccessToken();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: customer.id,
        vin,
        package_id: pkg.id,
        amount_cents: pkg.price_cents,
        currency: pkg.currency,
        access_token_hash: await sha256Hex(accessToken),
      })
      .select("reference")
      .single();
    if (orderError) throw orderError;

    return json({ reference: order.reference, accessToken }, 201);
  } catch (error) {
    console.error("create-order failed", error);
    return json({ error: "We could not save your order. Please try again." }, 500);
  }
});
