"use server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  return new Response(
    JSON.stringify({
      message: "OAuth callback received",
      code,
      state,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
