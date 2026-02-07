import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { classEnrollments, users, classes } from "@/db/schema";

type CreateEnrollmentPayload = {
  studentId?: string;
  classId?: string;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const classId = searchParams.get("classId");
    const studentId = searchParams.get("studentId");

    const filters = [];
    if (classId) {
      filters.push(eq(classEnrollments.classId, classId));
    }
    if (studentId) {
      filters.push(eq(classEnrollments.studentId, studentId));
    }

    const where = filters.length ? and(...filters) : undefined;

    // Join with users (student) and classes to get names
    const data = await db
      .select({
        id: classEnrollments.id,
        studentId: classEnrollments.studentId,
        studentName: users.name,
        classId: classEnrollments.classId,
        className: classes.name,
        enrolledAt: classEnrollments.enrolledAt,
        enrolledBy: classEnrollments.enrolledBy,
      })
      .from(classEnrollments)
      .leftJoin(users, eq(classEnrollments.studentId, users.id))
      .leftJoin(classes, eq(classEnrollments.classId, classes.id))
      .where(where)
      .orderBy(desc(classEnrollments.enrolledAt));

    // Fetch enrolledBy names separately
    const dataWithEnrolledBy = await Promise.all(
      data.map(async (item) => {
        let enrolledByName = null;
        if (item.enrolledBy) {
          const [enrolledUser] = await db
            .select({ name: users.name })
            .from(users)
            .where(eq(users.id, item.enrolledBy))
            .limit(1);
          enrolledByName = enrolledUser?.name || null;
        }
        return {
          ...item,
          enrolledByName,
        };
      })
    );

    return NextResponse.json({ success: true, data: dataWithEnrolledBy });
  } catch (error) {
    console.error("Error fetching class enrollments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch class enrollments",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get session user
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Lookup database user ID from Clerk ID
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkUserId))
      .limit(1);

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as CreateEnrollmentPayload;
    const { studentId, classId } = body;

    if (!studentId || !classId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: studentId, classId" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select({ id: classEnrollments.id })
      .from(classEnrollments)
      .where(and(eq(classEnrollments.studentId, studentId), eq(classEnrollments.classId, classId)))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Student already enrolled in this class" },
        { status: 409 }
      );
    }

    const [created] = await db
      .insert(classEnrollments)
      .values({
        studentId,
        classId,
        enrolledBy: currentUser.id, // Auto-assign from session
      })
      .returning();

    return NextResponse.json(
      { success: true, data: created, message: "Student enrolled successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error enrolling student:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to enroll student",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
