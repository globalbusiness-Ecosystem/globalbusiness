import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    const response = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const user = await response.json();
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
