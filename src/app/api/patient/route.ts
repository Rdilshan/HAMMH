import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {IsMobilePhone} from 'class-validator';

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

    const authid = request.headers.get("x-user-id");
    console.log(authid);

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
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    if(IsMobilePhone(data.telephone)){
      return NextResponse.json(
        { msg: "Invalid phone number" },
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
        created_by: Number(authid),
        location:data.location
      },
    })

    return NextResponse.json({ message: newPatient }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: error },
      { status: 500 }
    );
  }
}
