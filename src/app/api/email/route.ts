import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as nodemailer.TransportOptions);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: data.email,
      subject: data.subject,
      text: data.message,
    });

    return NextResponse.json(
      { message: "success send email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error  send email:", error);
    return NextResponse.json(
      { error: "Failed to  send email" },
      { status: 500 }
    );
  }
}
