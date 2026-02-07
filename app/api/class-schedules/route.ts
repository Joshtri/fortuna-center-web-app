import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { classSchedules, users, classes } from "@/db/schema";
import { eq, and, exists } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

// GET - List all schedules with filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const teacherId = searchParams.get("teacherId");
        const classId = searchParams.get("classId");
        const dayOfWeek = searchParams.get("dayOfWeek");
        const isActive = searchParams.get("isActive");

        const filters = [];
        // If teacherId is provided, we want to see ALL rows for any slot that this teacher is part of.
        // This ensures co-teachers are visible even when filtered by one teacher.
        if (teacherId) {
            const cs2 = alias(classSchedules, "cs2");
            filters.push(
                exists(
                    db.select()
                        .from(cs2)
                        .where(and(
                            eq(cs2.classId, classSchedules.classId),
                            eq(cs2.dayOfWeek, classSchedules.dayOfWeek),
                            eq(cs2.startTime, classSchedules.startTime),
                            eq(cs2.endTime, classSchedules.endTime),
                            eq(cs2.teacherId, teacherId)
                        ))
                )
            );
        }

        if (classId) filters.push(eq(classSchedules.classId, classId));
        if (dayOfWeek) filters.push(eq(classSchedules.dayOfWeek, parseInt(dayOfWeek)));
        if (isActive !== null) filters.push(eq(classSchedules.isActive, isActive === "true"));

        const rawData = await db
            .select({
                id: classSchedules.id,
                classId: classSchedules.classId,
                className: classes.name,
                teacherId: classSchedules.teacherId,
                teacherName: users.name,
                teacherImage: users.image,
                dayOfWeek: classSchedules.dayOfWeek,
                startTime: classSchedules.startTime,
                endTime: classSchedules.endTime,
                location: classSchedules.location,
                isActive: classSchedules.isActive,
                notes: classSchedules.notes,
            })
            .from(classSchedules)
            .leftJoin(classes, eq(classSchedules.classId, classes.id))
            .leftJoin(users, eq(classSchedules.teacherId, users.id))
            .where(filters.length ? and(...filters) : undefined);

        // Grouping logic for multiple teachers per class/slot
        const groupedMap = new Map();

        rawData.forEach((item) => {
            const key = `${item.classId}-${item.dayOfWeek}-${item.startTime}-${item.endTime}`;

            if (!groupedMap.has(key)) {
                groupedMap.set(key, {
                    ...item,
                    ids: [item.id],
                    teachers: [{
                        id: item.teacherId,
                        name: item.teacherName,
                        image: item.teacherImage
                    }]
                });
            } else {
                const existing = groupedMap.get(key);
                existing.ids.push(item.id);

                // Prioritize non-null location
                if (!existing.location && item.location) {
                    existing.location = item.location;
                }

                // Avoid duplicate teachers in the same group
                if (!existing.teachers.some((t: { id: string }) => t.id === item.teacherId)) {
                    existing.teachers.push({
                        id: item.teacherId,
                        name: item.teacherName,
                        image: item.teacherImage
                    });
                }
            }
        });

        const data = Array.from(groupedMap.values());

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Fetch schedules error:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch schedules" }, { status: 500 });
    }
}

// POST - Create new schedule
export async function POST(request: NextRequest) {
    try {
        const { userId: clerkUserId } = await auth();
        if (!clerkUserId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const [user] = await db.select().from(users).where(eq(users.clerkId, clerkUserId)).limit(1);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const body = await request.json();
        const { classId, teacherId, dayOfWeek, startTime, endTime, location, notes } = body;

        const [created] = await db
            .insert(classSchedules)
            .values({
                classId,
                teacherId,
                dayOfWeek,
                startTime,
                endTime,
                location,
                notes,
                createdBy: user.id,
            })
            .returning();

        return NextResponse.json({ success: true, data: created }, { status: 201 });
    } catch {
        return NextResponse.json({ success: false, message: "Failed to create schedule" }, { status: 500 });
    }
}
