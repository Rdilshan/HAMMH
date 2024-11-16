import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const admin = await prisma.user.findMany({ where: { role: "admin" } });
    return NextResponse.json(admin); // Return response here
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const salt = genSaltSync(Number(process.env.PWD_SALT!));
    const hash = hashSync(data.password, salt);
    const admin = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        role: "admin",
        telephone: data.telephone,
        gender: data.gender,
      },
    });

    return NextResponse.json(
      { message: "success create admin" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin" },
      { status: 500 }
    );
  }
}
