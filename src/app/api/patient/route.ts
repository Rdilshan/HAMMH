import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const patient = await prisma.patients.findMany();
    return NextResponse.json(patient);
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
      !data.telephone ||
      !data.address ||
      !data.age ||
      !data.nic ||
      !data.gender ||
      !data.source_reffern
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newPatient = await prisma.patients.create({
      data: {
        name: data.name,
        telephone: data.telephone,
        address: data.address,
        age: data.age,
        nic: data.nic,
        gender: data.gender,
        source_reffern: data.source_reffern,
        created_by: 1,
      },
    });

    return NextResponse.json({ message: newPatient }, { status: 200 });
  } catch (error) {
    // console.log("Error fetching patient:", error);
    return NextResponse.json(
      { msg: "Failed to fetch patient", error: error },
      { status: 500 }
    );
  }
}
