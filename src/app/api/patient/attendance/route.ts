import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const patientData = await prisma.clinic.findMany({
      where: {
        status: "booking",
      },
      select: {
        clinc_data: true,
        patient: {
          select: {
            id: true,
            name: true,
            telephone: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json({ patientData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}
