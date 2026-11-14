import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const REFERENCE_PATTERN = /^VS24-\d+$/;
const TOKEN_PATTERN = /^[a-f0-9]{64}$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

const sha256Hex = async (value: string) =>
  toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    const body = await req.json().catch(() => null);
    const reference = typeof body?.reference === "string" ? body.reference.trim() : "";
    const accessToken = typeof body?.accessToken === "string" ? body.accessToken.trim() : "";

    if (!REFERENCE_PATTERN.test(reference) || !TOKEN_PATTERN.test(accessToken)) {
      return json({ error: "Order not found." }, 404);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: order, error } = await supabase
      .from("orders")
      .select(
        "reference, created_at, vin, amount_cents, currency, payment_status, report_status, paid_at, access_token_hash, customers(email), packages(name, report_validity_days)",
      )
      .eq("reference", reference)
      .maybeSingle();
    if (error) throw error;

    const tokenMatches = order !== null && order.access_token_hash === (await sha256Hex(accessToken));
    if (!order || !tokenMatches) {
      return json({ error: "Order not found." }, 404);
    }

    const customer = order.customers as unknown as { email: string };
    const pkg = order.packages as unknown as { name: string; report_validity_days: number };

    return json({
      reference: order.reference,
      createdAt: order.created_at,
      customerEmail: customer.email,
      vin: order.vin,
      amountCents: order.amount_cents,
      currency: order.currency,
      paymentStatus: order.payment_status,
      reportStatus: order.report_status,
      paidAt: order.paid_at,
      packageName: pkg.name,
      reportValidityDays: pkg.report_validity_days,
    });
  } catch (error) {
    console.error("get-order failed", error);
    return json({ error: "We could not load your order. Please try again." }, 500);
  }
});
