import { NextResponse } from "next/server";
import { getComments, addComment } from "@/lib/wedding/comments";

export async function GET() {
  try {
    const comments = await getComments();
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json(
      { error: "Could not load wishes. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot spam protection
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (name.length > 70) {
      return NextResponse.json(
        { error: "Name is too long (maximum 70 characters)." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Please write a message or blessing." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message is too long (maximum 1000 characters)." },
        { status: 400 }
      );
    }

    const newComment = await addComment(name, message);
    return NextResponse.json({ ok: true, comment: newComment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not post your message. Please try again." },
      { status: 500 }
    );
  }
}
