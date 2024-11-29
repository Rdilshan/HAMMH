import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
import EmailService from "@/app/api/email/email";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: "doctor",
      },
    });
    return NextResponse.json(doctors); // Return response here
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {

    const data = await request.json();


    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { msg: "Invalid or missing request body" },
        { status: 400 }
      );
    }

    const exitingdoctor = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (exitingdoctor) {
      return NextResponse.json(
        { msg: "Email already exists" },
        { status: 400 }
      );
    }

    // Process the data (creating a doctor)
    const newDoctor = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: "doctor",
        telephone: data.telephone,
        Specialization: data.Specialization,
        gender: data.gender,
        active_status: "Deactive",
      },
    });

    if (!newDoctor) {
      return NextResponse.json(
        { message: "Failed to create doctor" },
        { status: 500 }
      );
    }

    // Send email
    const emailService = new EmailService();
    try {
      await emailService.sendEmail(
        data.email,
        "Welcome to our platform",
        "Thank you for joining our platform!"
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return NextResponse.json(
      { message: "Doctor created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

