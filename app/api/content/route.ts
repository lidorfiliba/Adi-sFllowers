import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await prisma.siteContent.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return NextResponse.json(map);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const updates: Record<string, string> = await request.json();
  const ops = Object.entries(updates).map(([key, value]) =>
    prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  );
  await Promise.all(ops);
  return NextResponse.json({ ok: true });
}
