import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  
    try {
     
      const injections = await prisma.injection.findMany({
        where:{
          Status:"processing",
        },
        select:{
          Date:true,
          patient:{
            select:{
              id:true,
              name:true,
              injection_type:true,
              telephone:true,
              address:true
            }
          }
        }
      });
      return NextResponse.json({injections},{status:200});
    
    } catch (error) {
      console.error("Error fetching injections:", error);

      return NextResponse.json(
        { error: "Failed to fetch injections" },
        { status: 500 }
      );
    }
}
