import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  //exclude the /api/Auth route
  const routepath = request.nextUrl.pathname;

  if (routepath.startsWith("/api/")) {
    if (routepath == "/api/Auth" || routepath == "/api/doctor/verify") {
      return NextResponse.next();
    }

    // const authHeader = request.headers.get("authorization");

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return NextResponse.json(
    //     { message: "Authorization header missing or invalid" },
    //     { status: 401 }
    //   );
    // }
    // const token = authHeader.split(" ")[1];
    const token = (await cookies()).get("token")?.value;

    if (token === undefined || token === null) {
      return NextResponse.json(
        { message: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

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
        if (
          routepath == "/api/doctor" ||
          routepath == "/api/Nurse/" ||
          routepath == "/api/Admin"
        ) {
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
        { message: "Invalid or expired token", error: error },
        { status: 403 }
      );
    }
  }

  if (routepath.startsWith("/dashboard")) {
    const token = (await cookies()).get("token")?.value;

    if (token === undefined || token === null) {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const decodedToken = await jose.jwtVerify(token, secret);

    const payloadData = decodedToken.payload.data as {
      role: string;
      id: string;
    };
    const role: string = payloadData.role;
    const userid: string = payloadData.id;

    console.log(role);
    console.log(userid);

    const response = NextResponse.next();
    response.headers.set("X-Role", role);
    response.headers.set("X-Id", userid);

    return response;
  }

  if (routepath.startsWith("/")) {
    const token = (await cookies()).get("token")?.value;

    if (token === undefined || token === null) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*", "/"],
};
