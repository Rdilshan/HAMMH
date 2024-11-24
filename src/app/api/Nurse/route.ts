import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const Nurse = await prisma.user.findMany({ where: { role: "nurse" } });
    return NextResponse.json(Nurse); // Return response here
  } catch (error) {
    console.error("Error fetching Nurse:", error);
    return NextResponse.json(
      { error: "Failed to fetch Nurse" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const salt = genSaltSync(Number(process.env.PWD_SALT!));
    const hash = hashSync(data.password, salt);
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        role: "nurse",
        telephone: data.telephone,
        gender: data.gender,
      },
    });

    return NextResponse.json(
      { message: "success create Nurse" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Nurse:", error);
    return NextResponse.json(
      { error: "Failed to fetch Nurse" },
      { status: 500 }
    );
  }
}
