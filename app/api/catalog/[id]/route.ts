import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  if (body.price !== undefined) body.price = Number(body.price);
  const item = await prisma.bouquetCatalog.update({ where: { id }, data: body });
  return NextResponse.json(item);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "לא מורשה" }, { status: 401 });

  const { id } = await params;
  await prisma.bouquetCatalog.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
