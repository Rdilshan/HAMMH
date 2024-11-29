import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
import EmailService from "@/app/api/email/email";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign(
      {
        data: {
          id: newDoctor.id,
          email: newDoctor.email,
        },
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    // Send email
    const emailService = new EmailService();
    try {
      await emailService.sendEmail(
        data.email,
        "Welcome to Our Platform!",
        `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="color: #4CAF50;">Welcome to Our Platform, Dr. ${data.name}!</h1>
            <p>
              We're excited to have you join our community of dedicated healthcare professionals. 
              Get ready to make a difference and start your journey as a doctor on our platform.
            </p>
            <p>
              To get started, please verify your email and create your profile by clicking the link below:
            </p>
            <a 
              href="${process.env.NEXT_PUBLIC_API_BASE_URL}/verify/${token}" 
              style="display: inline-block; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Click Here to Verify & Create Your Profile
            </a>
            <p style="margin-top: 20px;">
              If you have any questions or need assistance, feel free to reach out to our support team.
            </p>
            <p style="color: #888;">Best regards,<br/>The Support Team</p>
          </div>
        `
      );
      console.log('Welcome email sent successfully to', data.email);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return NextResponse.json(
      { message: "Doctor created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
