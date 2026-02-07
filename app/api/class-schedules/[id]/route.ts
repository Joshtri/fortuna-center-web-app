import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { classSchedules } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET - Single schedule
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const [schedule] = await db
        .select()
        .from(classSchedules)
        .where(eq(classSchedules.id, id))
        .limit(1);

    if (!schedule) {
        return NextResponse.json({ success: false, message: "Schedule not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: schedule });
}

// PATCH - Update schedule (for drag & drop)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();

    const [updated] = await db
        .update(classSchedules)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(classSchedules.id, id))
        .returning();

    return NextResponse.json({ success: true, data: updated });
}

// DELETE - Delete schedule
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    await db.delete(classSchedules).where(eq(classSchedules.id, id));

    return NextResponse.json({ success: true, message: "Schedule deleted" });
}
