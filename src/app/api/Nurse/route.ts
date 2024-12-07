import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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

    const emailService = new EmailService();
    try {
      await emailService.sendEmail(
        data.email,
        "Welcome to Our Platform!",
        `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="color: #4CAF50;">Welcome to Our Platform, Mr/Miss/Mrs. ${data.name}!</h1>
            <p>
              We're excited to have you join our community of dedicated healthcare professionals. 
              Get ready to make a difference and start your journey as a doctor on our platform.
            </p>
            <p>
              To get started, please verify your email and create your profile by clicking the link below:
            </p>
            <a 
              href="${process.env.NEXT_PUBLIC_API_BASE_URL}/verifyNurse/${token}" 
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
      { msg: "Nurse created successfully", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error );
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

