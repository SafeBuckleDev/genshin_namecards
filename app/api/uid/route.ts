import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing UID" }, { status: 400 });
  }

  const res = await fetch(`https://enka.network/api/uid/${uid}/`, {
    headers: { "User-Agent": "genshin-builder" },
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
