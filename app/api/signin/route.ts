import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();
    console.log("[signin] accessToken received:", accessToken ? accessToken.slice(0, 12) + "..." : "MISSING");

    const response = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("[signin] Pi /v2/me status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.log("[signin] Pi /v2/me error body:", errText);
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const user = await response.json();
    console.log("[signin] success, user:", user.uid);
    return NextResponse.json({ success: true, user });
  } catch (e) {
    console.error("[signin] exception:", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
