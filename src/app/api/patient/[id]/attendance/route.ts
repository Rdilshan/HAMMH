import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const records = await prisma.clinic.findMany({
      where: {
        patient_id: Number(id),
        status: {
          not: "booking",
        },
      },
      select: {
        clinc_data: true,
        status: true,
      },
      orderBy: {
        clinc_data: "asc",
      },
    });

    const nextdate = await prisma.clinic.findFirst({
        where: {
          patient_id: Number(id),
          status: "booking",
        },
        select: {
          clinc_data: true,
        },
      });
      

    return NextResponse.json({ records: records,nextdate:nextdate }, { status: 200 });
  } catch (error) {
    console.error("Error fetching clinic:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic" },
      { status: 500 }
    );
  }
}
