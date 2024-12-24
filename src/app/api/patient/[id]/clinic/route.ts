import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ClincType } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const records = await prisma.clinic.findMany({
      where: { patient_id: Number(id), status: "Attend" },
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

    //get the patient details
    const patientvalue = await prisma.patients.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        clinic_session: true,
      },
    });

    if (patientvalue?.clinic_session) {
      var patientclinc = patientvalue?.clinic_session;
    } else {
      var patientclinc = "Genaral_Clinic";
    }
    //not attendence
    await prisma.clinic.updateMany({
      where: {
        clinc_data: {
          lt: new Date(data.clinc_data),
        },
        patient_id: Number(id),
        status: "booking",
      },
      data: {
        status: "Not_attence",
      },
    });

    const checkingDate = new Date(data.clinc_data);
    const startOfDay = new Date(checkingDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(checkingDate.setUTCHours(23, 59, 59, 999));

    const checkdata = await prisma.clinic.findFirst({
      where: {
        clinc_data: {
          gte: startOfDay,
          lt: endOfDay,
        },
        patient_id: Number(id),
      },
    });

    if (!checkdata) {
      console.log("No matching clinic data found.");
      await prisma.clinic.create({
        data: {
          Images: data.Images,
          clinc_data: data.clinc_data,
          next_data: data.next_data,
          patient_id: Number(id),
          status: "Attend",
          clinc_type: patientclinc as ClincType
        },
      });
    } else {
      console.log("Matching clinic data found:", checkdata);
      await prisma.clinic.update({
        where: {
          id: checkdata.id,
        },
        data: {
          Images: data.Images,
          clinc_data: data.clinc_data,
          next_data: data.next_data,
          patient_id: Number(id),
          status: "Attend",
        },
      });
    }

    //save nextdate
    await prisma.clinic.create({
      data: {
        Images: [],
        clinc_data: data.next_data,
        patient_id: Number(id),
        clinc_type: patientclinc as ClincType
        
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

export async function DELETE(request: Request) {
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
