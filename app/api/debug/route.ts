import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "NOT SET";
  const testEndpoint = `${apiUrl.trim().replace(/\/$/, "")}/faqs/1`;

  const results: Record<string, any> = {
    env_var_value: apiUrl,
    env_var_length: apiUrl.length,
    test_url: testEndpoint,
    timestamp: new Date().toISOString(),
  };

  // Test 1: Try fetch with the configured URL
  try {
    const startTime = Date.now();
    const response = await fetch(testEndpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15000),
    });

    results.fetch_status = response.status;
    results.fetch_ok = response.ok;
    results.fetch_time_ms = Date.now() - startTime;
    results.fetch_headers = Object.fromEntries(response.headers.entries());

    const text = await response.text();
    results.fetch_body_length = text.length;
    results.fetch_body_preview = text.substring(0, 500);

    try {
      results.fetch_json = JSON.parse(text);
    } catch {
      results.fetch_json_parse_error = "Response is not valid JSON";
    }
  } catch (error: any) {
    results.fetch_error = {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      cause: error?.cause?.message || error?.cause?.code,
    };
  }

  // Test 2: Also try the cni.ratoguras.com for comparison
  try {
    const startTime = Date.now();
    const response = await fetch("https://cni.ratoguras.com/api/faqs/1", {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    results.comparison_cni_status = response.status;
    results.comparison_cni_time_ms = Date.now() - startTime;
    const text = await response.text();
    results.comparison_cni_body_length = text.length;
  } catch (error: any) {
    results.comparison_cni_error = error?.message;
  }

  return NextResponse.json(results, { status: 200 });
}
