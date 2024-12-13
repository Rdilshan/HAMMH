import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    

    const checkingData = await prisma.patients.findMany({
        where: { id: Number(id), use_injection: "No" },
      });
      if (checkingData.length == 1) {
        return NextResponse.json(
          { message: "This patient not use injection" },
          { status: 400 }
        );
      }

    const records = await prisma.injection.findMany({
      where: { patient_id: Number(id) },
    });

    return NextResponse.json({ data: records }, { status: 200 });

  } catch (error) {
    console.error("Error fetching admit:", error);
    return NextResponse.json(
      { error: "Failed to fetch admit" },
      { status: 500 }
    );
  }
}

// export async function POST(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const id = (await params).id;
//     const data = await request.json();
//     await prisma.injection.updateMany({
//       where: {
//         Date: {
//           lt: new Date(data.Date),
//         },
//         patient_id: Number(id),
//         Status: "processing",
//       },
//       data: {
//         Status: "done",
//       },
//     });

//     const checkingData = await prisma.patients.findMany({
//         where: { id: Number(id), use_injection: "No" },
//       });
//       if (checkingData.length == 1) {
//         return NextResponse.json(
//           { message: "This patient not use injection" },
//           { status: 400 }
//         );
//       }
    
//     await prisma.injection.updateMany({
//       where: { patient_id: Number(id), Status: "processing" }, 
//       data: { Status: "done" },
//     });

//     const checkingDate = new Date(data.Date);
//     const startOfDay = new Date(checkingDate.setUTCHours(0, 0, 0, 0));
//     const endOfDay = new Date(checkingDate.setUTCHours(23, 59, 59, 999));
//     const checkdata = await prisma.injection.findFirst({
//       where: {
//         Date: {
//           gte: startOfDay,
//           lt: endOfDay,
//         },
//         patient_id: Number(id),
//       },
//     });

//     if (!checkdata) {
//       console.log("No matching injection data found.");
//       await prisma.injection.create({
//         data: {
         
//           patient_id: Number(id),
//           doctorName: (data.doctorName)?data.doctorName:null,
//           nurseName:(data.nurseName)?data.nurseName:null,
//           socialWorkers:(data.socialWorkers)?data.socialWorkers:null,
//           drugType:data.drugType,
//           Date:data.Date,
//           NextDate:data.NextDate,
//           Status:"processing"
//         },
//       });
//     } else {
//       console.log("Matching injection data found:", checkdata);
//       await prisma.injection.update({
//         where: {
//           id: checkdata.id,
//         },
//         data: {
          
//           patient_id: Number(id),
//         doctorName: (data.doctorName)?data.doctorName:null,
//         nurseName:(data.nurseName)?data.nurseName:null,
//         socialWorkers:(data.socialWorkers)?data.socialWorkers:null,
//         drugType:data.drugType,
//         Date:data.Date,
//         NextDate:data.NextDate,
//         Status:"done"
//         },
//       });
//     }
//     await prisma.injection.create({
//       data: {
//         Date: data.Date,
//         patient_id: Number(id),
//       },
//     });

//     return NextResponse.json(
//       { data: records },
//       { message: "Patient injection add" },
//       { status: 200 }
//     );


//     // const records = await prisma.injection.create({
//     //   data: {
//     //     patient_id: Number(id),
//     //     doctorName: (data.doctorName)?data.doctorName:null,
//     //     nurseName:(data.nurseName)?data.nurseName:null,
//     //     socialWorkers:(data.socialWorkers)?data.socialWorkers:null,
//     //     drugType:data.drugType,
//     //     Date:data.Date,
//     //     NextDate:data.NextDate,
//     //     Status:"processing"
//     //   },
//     // });

//     // return NextResponse.json({ data: records }, { status: 200 });
    
//   } catch (error) {
//     console.error("Error fetching admit:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch admit" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const id = (await params).id;

    await prisma.injection.updateMany({
      where: {
        Date: {
          lt: new Date(data.Date),
        },
        patient_id: Number(id),
        Status: "processing",
      },
      data: {
        Status: "done",
      },
    });


    const checkingDate = new Date(data.Date);
    const startOfDay = new Date(checkingDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(checkingDate.setUTCHours(23, 59, 59, 999));

    const existingInjection = await prisma.injection.findFirst({
      where: {
        Date: {
          gte: startOfDay,
          lt: endOfDay,
        },
        patient_id: Number(id),
      },
    });

    if (!existingInjection) {
      console.log("No matching injection data found.");
      await prisma.injection.create({
        data: {
          patient_id: Number(id),
          doctorName: data.doctorName || null,
          nurseName: data.nurseName || null,
          socialWorkers: data.socialWorkers || null,
          drugType: data.drugType,
          Date: data.Date,
          NextDate: data.NextDate,
          Status: "done",
        },
      });
    } else {
      console.log("Matching clinic data found:", existingInjection);
      await prisma.injection.update({
        where: { id: existingInjection.id },
        data: {
          doctorName: data.doctorName || null,
          nurseName: data.nurseName || null,
          socialWorkers: data.socialWorkers || null,
          drugType: data.drugType,
          Date: data.Date,
          NextDate: data.NextDate,
          Status: "done",
        },
      });
    }
    await prisma.injection.create({
      data: {
        Date: data.NextDate,
        patient_id: Number(id),
        drugType: data.drugType, 
        NextDate: data.NextDate,
        Status: "processing",
      },
    });

    return NextResponse.json(
      { message: "Patient injection updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing injection:", error);
    return NextResponse.json(
      { error: "Failed to process injection" },
      { status: 500 }
    );
  }
}
