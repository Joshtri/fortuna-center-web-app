
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users.schema";
import { teacherClasses } from "@/db/schema/teacher-class.schema";
import { classes } from "@/db/schema/class.schema";
import { classEnrollments } from "@/db/schema/class-enrollment.schema";
import { eq, count } from "drizzle-orm";

export async function GET() {
    try {
        // 1. Get the current teacher (Simulated: fetch first teacher found)
        const teacherUser = await db.query.users.findFirst({
            where: eq(users.role, 'TEACHER')
        });

        if (!teacherUser) {
            return NextResponse.json({ error: "No teacher user found in database." }, { status: 404 });
        }

        const teacherId = teacherUser.id;

        // 2. Fetch classes assigned to this teacher
        // We can use db.query to get nested data if relations are set up, or just joins.
        // Let's use db.query.teacherClasses
        const assignedClasses = await db.query.teacherClasses.findMany({
            where: eq(teacherClasses.teacherId, teacherId),
            with: {
                class: true
            }
        });

        // 3. Transform and get student counts
        const classList = await Promise.all(assignedClasses.map(async (tc) => {
            // Count students in this class
            let studentCount = 0;
            try {
                const result = await db
                    .select({ value: count() })
                    .from(classEnrollments)
                    .where(eq(classEnrollments.classId, tc.classId));
                studentCount = result[0].value;
            } catch (e) {
                console.error("Error counting students for class", tc.classId, e);
            }

            return {
                id: tc.class.id,
                name: tc.class.name,
                code: tc.class.code,
                description: tc.class.description,
                students: studentCount,
                // assignments: 0 // Fetch assignments count if needed later
            };
        }));

        return NextResponse.json(classList);

    } catch (error) {
        console.error("Error fetching teacher classes:", error);
        return NextResponse.json(
            { error: "Failed to fetch classes" },
            { status: 500 }
        );
    }
}
