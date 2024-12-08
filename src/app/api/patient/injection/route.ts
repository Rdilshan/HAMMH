import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  
    try {
     
      const injections = await prisma.injection.findMany();
      return NextResponse.json(injections);
    
    } catch (error) {
      console.error("Error fetching injections:", error);

      return NextResponse.json(
        { error: "Failed to fetch injections" },
        { status: 500 }
      );
    }
}
