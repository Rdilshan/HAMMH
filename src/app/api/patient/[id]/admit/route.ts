import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const records = await prisma.hospitaladmit.findMany({
      where: { patient_id: Number(id) },
    });

    return NextResponse.json({ records: records }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admit:", error);
    return NextResponse.json(
      { error: "Failed to fetch admit" },
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

    const checkingData = await prisma.patients.findMany({
      where: { id: Number(id), is_admit: "Yes" },
    });
    if (checkingData.length > 0) {
      return NextResponse.json(
        { message: "Patient already admitted" },
        { status: 400 }
      );
    }

    await prisma.hospitaladmit.create({
      data: {
        ward: data.ward,
        BHT_no: data.BHT_no,
        principal_diagnosis: data.principal_diagnosis,
        procedures: data.procedures,
        mode_of_admission: data.mode_of_admission,
        special_note: data.special_note,
        patient_id: Number(id),
        admit_date: data.admit_date,
      },
    });

    //you should send like that data
    // {
    //   "ward": "General",
    //   "BHT_no": "12345",
    //   "principal_diagnosis": "Pneumonia",
    //   "procedures": "Chest X-Ray, Blood Test",
    //   "mode_of_admission": "Emergency",
    //   "special_note": "Patient is under observation",
    //   "admit_date": "2024-11-19T10:30:00Z"
    // }

    await prisma.patients.update({
      where: { id: Number(id) },
      data: { is_admit: "Yes" },
    });

    return NextResponse.json({ message: "Patient Admit" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admit:", error);
    return NextResponse.json(
      { message: "Failed to fetch admit" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const data = await request.json();

    const checkingData = await prisma.patients.findMany({
      where: { id: Number(id), is_admit: "Yes" },
    });
    if (checkingData.length > 0) {
      await prisma.hospitaladmit.update({
        where: { id: Number(data.admit_id) },
        data: {
          made_of_discharge: data.made_of_discharge,
          dischagre_note: data.dischagre_note,
          discharge_date: data.discharge_date,
        },
      });

      await prisma.patients.update({
        where: { id: Number(id) },
        data: { is_admit: "No" },
      });

      return NextResponse.json(
        { message: "Patient Discharge" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Patient already admitted" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching admit:", error);
    return NextResponse.json(
      { error: "Failed to fetch admit" },
      { status: 500 }
    );
  }

  //   you should send like that data

  //   {
  //     "admit_id":"3",
  //   "made_of_discharge": "made_of_discharge",
  //   "dischagre_note": "12345",
  //   "discharge_date": "2024-11-19T10:30:00Z"
  // }
}
