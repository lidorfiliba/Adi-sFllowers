import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ error: "נדרשת סיסמה" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findFirst();
    if (!admin) {
      return NextResponse.json({ error: "לא נמצא משתמש אדמין" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
    }

    const token = await signToken({ adminId: admin.id });
    await setSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
