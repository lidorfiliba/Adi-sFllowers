import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const { ids }: { ids: string[] } = await request.json();
  await Promise.all(
    ids.map((id, index) =>
      prisma.galleryItem.update({ where: { id }, data: { sortOrder: index } })
    )
  );
  return NextResponse.json({ ok: true });
}
