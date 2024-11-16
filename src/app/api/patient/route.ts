import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const patient = await prisma.patients.findMany();
    return NextResponse.json(patient); // Return response here
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.name ||
      !data.address ||
      !data.nic ||
      typeof data.age !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const newPatient = await prisma.patients.create({
        data: {
          name: data.name,
          telephone: data.telephone || null,
          address: data.address,
          age: data.age,
          nic: data.nic,
          source_referral: data.source_referral || null,
          gender: data.gender,
          created_by: data.created_by,
          Clinic_session: data.condition || null, 
          condition: data.condition || null, 
          diagonsis: data.diagonsis || null, 
          use_injection: data.use_injection || null,
          inject_type: data.inject_type || null,
          special_note: data.special_note || null
        },
      });

    return NextResponse.json(
      { message: "success create patient" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}
