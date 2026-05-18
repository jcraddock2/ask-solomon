import { NextResponse } from "next/server";
import { createHmac } from "crypto";

const SECRET = process.env.PDF_SECRET || "solomon-book-secret-2024";

export async function POST() {
    // Create a token: base64( timestamp + HMAC signature )
  // Valid for 60 seconds — enough time to load the PDF
  const ts = Date.now().toString();
    const sig = createHmac("sha256", SECRET).update(ts).digest("hex");
    const token = Buffer.from(ts + "|" + sig).toString("base64url");

  return NextResponse.json({ token }, { status: 200 });
}
