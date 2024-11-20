import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    

    const checkingData = await prisma.patients.findMany({
        where: { id: Number(id), use_injection: "No" },
      });
      if (checkingData.length == 1) {
        return NextResponse.json(
          { message: "This patient not use injection" },
          { status: 400 }
        );
      }

    const records = await prisma.injection.findMany({
      where: { patient_id: Number(id) },
    });

    return NextResponse.json({ data: records }, { status: 200 });

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
    const id = (await params).id;
    const data = await request.json();
    

    const checkingData = await prisma.patients.findMany({
        where: { id: Number(id), use_injection: "No" },
      });
      if (checkingData.length == 1) {
        return NextResponse.json(
          { message: "This patient not use injection" },
          { status: 400 }
        );
      }
    
    const updateinjection = await prisma.injection.updateMany({
      where: { patient_id: Number(id), Status: "processing" }, 
      data: { Status: "done" },
    });

    const records = await prisma.injection.create({
      data: {
        patient_id: Number(id),
        doctorName: (data.doctorName)?data.doctorName:null,
        nurseName:(data.nurseName)?data.nurseName:null,
        socialWorkers:(data.socialWorkers)?data.socialWorkers:null,
        drugType:data.drugType,
        Date:data.Date,
        NextDate:data.NextDate,
        Status:"processing"
      },
    });

    return NextResponse.json({ data: records }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching admit:", error);
    return NextResponse.json(
      { error: "Failed to fetch admit" },
      { status: 500 }
    );
  }
}