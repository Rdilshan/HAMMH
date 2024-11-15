import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  //exclude the /api/Auth route
  const routepath = request.nextUrl.pathname;

  if (routepath == "/api/Auth") {
    return NextResponse.next();
  }
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or invalid" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await jose.jwtVerify(token, secret);

    const payloadData = decodedToken.payload.data as { role: string };
    const role: string = payloadData.role;

    // Allow access to these dynamic routes
    if (
      routepath.startsWith("/api/doctor/") ||
      routepath.startsWith("/api/nurse/") 
    ) {
      return NextResponse.next(); 
    }

    //Block access doctor and nurse
    if (role == "doctor" || "nurse") {
      if (routepath == "/api/doctor" || "/api/Nurse/" || "/api/Admin") {
        return NextResponse.json(
          { message: "Unauthorized access" },
          { status: 401 }
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 }
    );
  }

  // return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
