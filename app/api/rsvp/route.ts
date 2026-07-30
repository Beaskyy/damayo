import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    if (!body.attendance) {
      return NextResponse.json(
        { error: "Attendance is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send your response. Please try again." },
      { status: 500 }
    );
  }
}
