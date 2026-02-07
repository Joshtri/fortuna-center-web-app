import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { classSchedules } from "@/db/schema";
import { eq } from "drizzle-orm";

// Get all schedules for a class
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: classId } = await params;

        const schedules = await db
            .select({
                id: classSchedules.id,
                dayOfWeek: classSchedules.dayOfWeek,
                startTime: classSchedules.startTime,
                endTime: classSchedules.endTime,
                room: classSchedules.location,
            })
            .from(classSchedules)
            .where(eq(classSchedules.classId, classId));

        return NextResponse.json(schedules);
    } catch (error) {
        console.error("Error fetching class schedules:", error);
        return NextResponse.json(
            { error: "Failed to fetch schedules" },
            { status: 500 }
        );
    }
}
