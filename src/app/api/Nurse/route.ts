import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import EmailService from "@/app/api/email/email"; // Ensure this exists and works

const prisma = new PrismaClient();

export async function GET() {
  try {
    const nurses = await prisma.user.findMany({ where: { role: "nurse" } });
    return NextResponse.json(nurses);
  } catch (error) {
    console.error("Error fetching nurses:", error);
    return NextResponse.json(
      { error: "Failed to fetch nurses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Check for required fields in the request
    if (!data.name || !data.email || !data.telephone || !data.gender) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the nurse record in the database
    const newNurse = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: "nurse",
        telephone: data.telephone,
        gender: data.gender,
        active_status: "Deactive",
      },
    });

    // Check if the nurse object was created correctly
    if (!newNurse || !newNurse.id || !newNurse.email) {
      throw new Error("Failed to create nurse or missing data in response.");
    }

    // Generate a token
    const token = jwt.sign(
      {
        id: newNurse.id,
        email: newNurse.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    return NextResponse.json(
      { msg: "Nurse created successfully", token },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing request:", error.message || error);
    return NextResponse.json(
      { msg: "Internal Server Error", error: error.message || error },
      { status: 500 }
    );
  }
}

