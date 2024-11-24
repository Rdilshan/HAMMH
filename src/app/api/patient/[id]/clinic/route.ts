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
      where: { patient_id: Number(id) },
    });

    return NextResponse.json({ records: records }, { status: 200 });
  } catch (error) {
    console.error("Error fetching clinic:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const id = (await params).id;

    await prisma.clinic.create({
      data: {
        Images: data.Images,
        clinc_data: data.clinc_data,
        next_data: data.next_data,
        patient_id: Number(id),
      },
    });

    return NextResponse.json(
      { message: "Patient clinic add" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching clinic:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const data = await request.json();
    await prisma.clinic.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(
      { message: "Patient clinic add" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching clinic:", error);
    return NextResponse.json(
      { error: "Failed to fetch clinic" },
      { status: 500 }
    );
  }
}
