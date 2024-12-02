import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = data.token;

    if (!token) {
      return NextResponse.json({ msg: "Token is required" }, { status: 400 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (error) {
      return NextResponse.json(
        { msg: "Token is invalid or expired" },
        { status: 401 }
      );
    }

    const userid = decodedToken?.id;

    if (!userid) {
      return NextResponse.json({ msg: "Token payload is invalid" }, { status: 400 });
    }

    const doctor = await prisma.user.findUnique({ where: { id: userid } });

    if (!doctor) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    if (doctor.active_status === "Active") {
      return NextResponse.json({ msg: "User is already active" }, { status: 202 });
    }

    return NextResponse.json({ data: doctor }, { status: 200 });
  } catch (error) {
    console.error("POST /api/Nurse/verify error:", error);
    return NextResponse.json({ msg: "Internal Server Error"}, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const checkingdoctor = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!checkingdoctor) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    if (checkingdoctor.active_status === "Active") {
      return NextResponse.json(
        { msg: "User is already active" },
        { status: 400 }
      );
    }

    const salt = genSaltSync(Number(process.env.PWD_SALT!));
    const hash = hashSync(data.password, salt);

    const doctor = await prisma.user.update({
      where: { id: data.id },
      data: { password: hash, active_status: "Active" },
    });

    return NextResponse.json({ data: doctor }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error"}, { status: 500 });
  }
}
