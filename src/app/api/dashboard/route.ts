import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export  async function GET() {
 
    try {
      const totalDoctors = await prisma.user.count({ where: { role: 'doctor' } });
      const totalNurses = await prisma.user.count({ where: { role: 'nurse' } });
      const totalPatients = await prisma.patients.count();
      const totalStaff = totalDoctors + totalNurses;
      const totalAdmittedPatients = await prisma.patients.count({where:{is_admit:"Yes"}});
      const totalmale = await prisma.patients.count({where:{gender:"male"}});
      const totalfemale = await prisma.patients.count({where:{gender:"female"}});
      const totalclinicPatients = await prisma.clinic.count();
      const totalinjection = await prisma.patients.count({where :{use_injection:"Yes"}})

      return NextResponse.json({
        doctors: totalDoctors,
        nurses: totalNurses,
        patients: totalPatients,
        staff: totalStaff,
        admit:totalAdmittedPatients,
        clinic:totalclinicPatients,
        injection:totalinjection,
        male:totalmale,
        female:totalfemale
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return NextResponse.json({ error: 'Failed to fetch data' });
      
    }
  }

