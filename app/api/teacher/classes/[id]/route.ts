
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users.schema";
import { classes } from "@/db/schema/class.schema";
import { classEnrollments } from "@/db/schema/class-enrollment.schema";
import { eq } from "drizzle-orm";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 1. Get the current teacher (Simulated: fetch first teacher found)
        // In real app, check auth() and ensure teacher is assigned to this class
        const teacherUser = await db.query.users.findFirst({
            where: eq(users.role, 'TEACHER')
        });

        if (!teacherUser) {
            return NextResponse.json({ error: "No teacher user found." }, { status: 404 });
        }

        const { id: classId } = await params;

        // 2. Fetch Class Details
        const classDetails = await db.query.classes.findFirst({
            where: eq(classes.id, classId)
        });

        if (!classDetails) {
            return NextResponse.json({ error: "Class not found." }, { status: 404 });
        }

        // 3. Fetch Enrolled Students
        const enrollments = await db.query.classEnrollments.findMany({
            where: eq(classEnrollments.classId, classId),
            with: {
                student: true
            }
        });

        const studentsList = enrollments.map(e => ({
            id: e.student.id,
            name: e.student.name,
            email: e.student.email,
            image: e.student.image,
            enrolledAt: e.enrolledAt
        }));

        return NextResponse.json({
            ...classDetails,
            students: studentsList
        });

    } catch (error) {
        console.error("Error fetching class details:", error);
        return NextResponse.json(
            { error: "Failed to fetch class details" },
            { status: 500 }
        );
    }
}
