import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "API routes are working",
    env: {
      EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Not set",
      EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Not set",
    },
  });
}
