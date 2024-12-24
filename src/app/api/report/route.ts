import { NextResponse } from "next/server";
import { ClincType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const start_date = data.start_date;
    const end_date = data.end_date;

    // Initialize variables with default values
    let c_general = 0;
    let c_child = 0;
    let c_substance = 0;
    let c_gender = 0;
    let c_elderly = 0;
    let c_other = 0;

    //Source of Referral
    let cnew_consultants = 0;
    let cnew_opd = 0;
    let cnew_wards = 0;
    let cnew_health = 0;
    let cnew_public = 0;
    let cnew_community = 0;
    let cnew_gps = 0;
    let cnew_count = 0;
    let cnew_ref = 0;
    let cnew_other = 0;

    const clinic = await prisma.clinic.groupBy({
      by: ["clinc_type"],
      where: {
        clinc_data: {
          gte: new Date(start_date),
          lte: new Date(end_date),
        },
        status: "Attend",
      },
      _count: {
        clinc_type: true,
      },
    });

    // Map the grouped data to variables
    clinic.forEach((group) => {
      switch (group.clinc_type) {
        case "Genaral_Clinic":
          c_general = group._count.clinc_type;
          break;
        case "Child_Adolescent_guidance_clinic":
          c_child = group._count.clinc_type;
          break;
        case "Substance_abuse_clinic":
          c_substance = group._count.clinc_type;
          break;
        case "Gender_based_violence_clinic":
          c_gender = group._count.clinc_type;
          break;
        case "Elderly_clinic":
          c_elderly = group._count.clinc_type;
          break;
        case "Other":
          c_other = group._count.clinc_type;
          break;
        default:
          break;
      }
    });

    const newpatients = await prisma.patients.groupBy({
      by: ["source_reffern"],
      where: {
        created_at: {
          gte: new Date(start_date),
          lte: new Date(end_date),
        },
        source_reffern: {
          not: "",
        },
      },
      _count: {
        source_reffern: true,
      },
    });

    newpatients.forEach((group) => {
      switch (group.source_reffern) {
        case "Consaltant":
          cnew_consultants = group._count.source_reffern;
          break;
        case "OPD":
          cnew_opd = group._count.source_reffern;
          break;
        case "Other wards":
          cnew_wards = group._count.source_reffern;
          break;
        case "Other health institution":
          cnew_health = group._count.source_reffern;
          break;
        case "Public":
          cnew_public = group._count.source_reffern;
          break;
        case "Community":
          cnew_community = group._count.source_reffern;
          break;
        case "GPs":
          cnew_gps = group._count.source_reffern;
          break;
        case "Courts":
          cnew_count = group._count.source_reffern;
          break;
        case "Self":
          cnew_ref = group._count.source_reffern;
          break;
        case "Other":
          cnew_other = group._count.source_reffern;
          break;
        default:
          break;
      }
    });

    return NextResponse.json(
      {
        data: {
          //clinic session
          c_general,
          c_child,
          c_substance,
          c_gender,
          c_elderly,
          c_other,
          newpatients,

          //Source of Referral
          cnew_consultants,
          cnew_opd,
          cnew_wards,
          cnew_health,
          cnew_public,
          cnew_community,
          cnew_gps,
          cnew_count,
          cnew_ref,
          cnew_other,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
