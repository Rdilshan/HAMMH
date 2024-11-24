import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id; 

        const nurse = await prisma.user.findUnique({
            where: {
                id: Number(id),
                role: "nurse"
            },
        })
        if(!nurse){
            return NextResponse.json({message:"user not found"},{status:404});
        }else{
            return NextResponse.json({nurse:nurse},{status:200});    
        }
    } catch (error) {
        console.error("Error fetching nurse:", error);
        return NextResponse.json(
            { error: "Failed to fetch nurse" },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id; 
        await prisma.user.delete({
            where: {
                id: Number(id),
                role: "nurse"
            },
        })
        return NextResponse.json({message:"success delete nurse"},{status:200});    
    } catch (error) {
        console.error("Error fetching nurse:", error);
        return NextResponse.json(
            { error: "Failed to fetch nurse" },
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
        await prisma.user.update({
            where: {
                id: Number(id),
                role: "nurse"
            },
            data: data
        })
        return NextResponse.json({message:"success update nurse"},{status:200});    
    } catch (error) {
        console.error("Error fetching nurse:", error);
        return NextResponse.json(
            { error: "Failed to fetch nurse" },
            { status: 500 }
        );
    }
}