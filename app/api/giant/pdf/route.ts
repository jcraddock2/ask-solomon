import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { readFile } from "fs/promises";
import path from "path";

const SECRET = process.env.PDF_SECRET || "solomon-book-secret-2024";
const MAX_AGE_MS = 60 * 1000;

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [ts, sig] = decoded.split("|");
    if (!ts || !sig) return false;
    const age = Date.now() - parseInt(ts, 10);
    if (age > MAX_AGE_MS || age < 0) return false;
    const expected = createHmac("sha256", SECRET).update(ts).digest("hex");
    return sig === expected;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token || !verifyToken(token)) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  try {
    const filePath = path.join(process.cwd(), "public", "Lessons from a Giant Killer PDF (3).pdf");
    const fileBuffer = await readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="lessons-from-a-giant-killer.pdf"',
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
