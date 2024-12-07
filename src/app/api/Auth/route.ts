import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;
    const checkuser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!checkuser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    if (data.password && checkuser.password) {
      const isPasswordValid = await compare(data.password, checkuser.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 401 }
        );
      } else {
        const token = jwt.sign(
          {
            data: {
              id: checkuser.id,
              role:checkuser.role
            },
          },
          process.env.JWT_SECRET!,
          { expiresIn: "7d" }
        );
  
  
  
        const response =  NextResponse.json(
          { token: token, Role: checkuser.role },
          { status: 200 }
        );
  
        response.cookies.set("token", token, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, 
        });
    
        return response;
      }
    }


  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
