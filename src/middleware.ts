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

    const payloadData = decodedToken.payload.data as {
      role: string;
      id: string;
    };
    const role: string = payloadData.role;
    const userid: string = payloadData.id;

    // Allow access to these dynamic routes
    if (
      routepath.startsWith("/api/doctor/") ||
      routepath.startsWith("/api/Nurse/")
    ) {
      const response = NextResponse.next();
      response.headers.set("x-user-id", userid); 
      return response;
    }

    //Block access doctor and nurse
    if (role != "admin") {
      
      if (routepath == "/api/doctor" || routepath =="/api/Nurse/" || routepath =="/api/Admin") {
        return NextResponse.json(
          { message: "Unauthorized access here" },
          { status: 401 }
        );
      }
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", userid); 
    return response;
    
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
