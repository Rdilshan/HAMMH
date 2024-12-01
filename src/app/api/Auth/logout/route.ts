import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const response = NextResponse.json(
      { msg: "Logged out successfully." },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 0, 
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
