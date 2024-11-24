import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";


const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.user.findMany(
      {
        where: {
          role: "doctor",
        },
      }
    );
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

    const salt = genSaltSync(Number(process.env.PWD_SALT!));
    const hash = hashSync(data.password, salt);
     await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        role: "doctor",
        telephone:data.telephone,
        Specialization:data.Specialization,
        gender:data.gender
      },
    });

    return NextResponse.json({message:"success create doctor"},{status:200}); 
    
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
