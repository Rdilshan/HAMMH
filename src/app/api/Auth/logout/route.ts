import { NextResponse } from "next/server";

export async function POST() {
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
