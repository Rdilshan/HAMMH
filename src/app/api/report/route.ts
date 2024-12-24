import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const start_date = data.start_date;
    const end_date = data.end_date;

    return NextResponse.json({ message: {start_date,end_date} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
