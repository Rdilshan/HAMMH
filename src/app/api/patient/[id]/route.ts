import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id; 

        const patients = await prisma.patients.findUnique({
            where: {
                id: Number(id)
            },
        })
        if(!patients){
            return NextResponse.json({message:"patients not found"},{status:404});
        }else{
            return NextResponse.json({patients:patients},{status:200});    
        }
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id; 
        await prisma.patients.delete({
            where: {
                id: Number(id)
            },
        })
        return NextResponse.json({message:"success delete patients"},{status:200});    
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id; 
        const data = await request.json();
        const patient =  await prisma.patients.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        return NextResponse.json({ message: "success update patients" }, { status: 200 });
        return NextResponse.json({message:"success update patients"},{status:200});    
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
          );
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        );
    }
}

