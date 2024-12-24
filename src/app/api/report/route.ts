import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const start_date = data.start_date;
    const end_date = data.end_date;

    let date = start_date+" to "+end_date;
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

    //Diagnosis
    //fristDiagnosis
    let F00_MF = 0,
      F00_FF = 0; //Dementia
    let F05_MF = 0,
      F05_FF = 0; //Delirium
    let F06_MF = 0,
      F06_FF = 0; //Other mental disorders due to brain damage
    let F10_MF = 0,
      F10_FF = 0; //Mental and behavioural disorders due to use of Alcohol
    let F11_MF = 0,
      F11_FF = 0; //Mental and behavioural disorders due to use of Opioids
    let F12_MF = 0,
      F12_FF = 0; //Mental and behavioural disorders due to use of Cannabinoids
    let F13_MF = 0,
      F13_FF = 0; //Mental and behavioural disorders due to use of Sedatives/Hypnotics
    let F17_MF = 0,
      F17_FF = 0; //Mental and behavioural disorders due to use of Tobacco
    let F20_MF = 0,
      F20_FF = 0; //Schizophrenia
    let F22_MF = 0,
      F22_FF = 0; //Delusional disorders
    let F23_MF = 0,
      F23_FF = 0; //Acute and transient psychotic disorders
    let F25_MF = 0,
      F25_FF = 0; //Schizoaffective disorders
    let F30_MF = 0,
      F30_FF = 0; //Manic episode / Bipolar affective disorder
    let F32_MF = 0,
      F32_FF = 0; //Depressive episode / Recurrent depressive disorder
    let F40_MF = 0,
      F40_FF = 0; //Anxiety disorders (e.g., Phobia, GAD)
    let F42_MF = 0,
      F42_FF = 0; //Obsessive compulsive disorders
    let F43_MF = 0,
      F43_FF = 0; //Reaction to severe stress and adjustment disorders
    let F44_MF = 0,
      F44_FF = 0; //Dissociative (conversion) disorder
    let F45_MF = 0,
      F45_FF = 0; //Somatoform disorders
    let F50_MF = 0,
      F50_FF = 0; //Eating disorders
    let F52_MF = 0,
      F52_FF = 0; //Sexual disorders
    let F53_FF = 0; //Pregnancy related mental disorders
    let F60_MF = 0,
      F60_FF = 0; //Personality disorders
    let F64_MF = 0,
      F64_FF = 0; //Gender identity disorders
    let F70_MF = 0,
      F70_FF = 0; //Mental retardation
    let F80_MF = 0,
      F80_FF = 0; //Speech and language disorders
    let F81_MF = 0,
      F81_FF = 0; //Specific development disorders of scholastic skills
    let F84_MF = 0,
      F84_FF = 0; //PDD including Autism
    let F90_MF = 0,
      F90_FF = 0; //ADHD
    let F91_MF = 0,
      F91_FF = 0; //Conduct disorder
    let F93_MF = 0,
      F93_FF = 0; //Emotional disorders with onset specific to childhood (e.g., separation anxiety, phobia, sibling rivalry)
    let F94_MF = 0,
      F94_FF = 0; //Disorders of social functioning with onset specific to childhood and adolescence (e.g., elective mutism, attachment disorders)
    let F95_MF = 0,
      F95_FF = 0; //Tic disorders
    let F98_MF = 0,
      F98_FF = 0; //Other behavioural and emotional disorders onset usually occurring in childhood and adolescence (e.g., enuresis, pica, encopresis, stammering)
    let F100_MF = 0,
      F100_FF = 0; //Epilepsy
    let F101_MF = 0,
      F101_FF = 0; //Other
    let F102_MF = 0,
      F102_FF = 0; //No psychiatric illness

    //old Diagnosis
    let F00_MO = 0,
      F00_FO = 0;
    let F05_MO = 0,
      F05_FO = 0;
    let F06_MO = 0,
      F06_FO = 0;
    let F10_MO = 0,
      F10_FO = 0;
    let F11_MO = 0,
      F11_FO = 0;
    let F12_MO = 0,
      F12_FO = 0;
    let F13_MO = 0,
      F13_FO = 0;
    let F17_MO = 0,
      F17_FO = 0;
    let F20_MO = 0,
      F20_FO = 0;
    let F22_MO = 0,
      F22_FO = 0;
    let F23_MO = 0,
      F23_FO = 0;
    let F25_MO = 0,
      F25_FO = 0;
    let F30_MO = 0,
      F30_FO = 0;
    let F32_MO = 0,
      F32_FO = 0;
    let F40_MO = 0,
      F40_FO = 0;
    let F42_MO = 0,
      F42_FO = 0;
    let F43_MO = 0,
      F43_FO = 0;
    let F44_MO = 0,
      F44_FO = 0;
    let F45_MO = 0,
      F45_FO = 0;
    let F50_MO = 0,
      F50_FO = 0;
    let F52_MO = 0,
      F52_FO = 0;
    let F53_FO = 0; // No male count for F53
    let F60_MO = 0,
      F60_FO = 0;
    let F64_MO = 0,
      F64_FO = 0;
    let F70_MO = 0,
      F70_FO = 0;
    let F80_MO = 0,
      F80_FO = 0;
    let F81_MO = 0,
      F81_FO = 0;
    let F84_MO = 0,
      F84_FO = 0;
    let F90_MO = 0,
      F90_FO = 0;
    let F91_MO = 0,
      F91_FO = 0;
    let F93_MO = 0,
      F93_FO = 0;
    let F94_MO = 0,
      F94_FO = 0;
    let F95_MO = 0,
      F95_FO = 0;
    let F98_MO = 0,
      F98_FO = 0;
    let F100_MO = 0,
      F100_FO = 0;
    let F101_MO = 0,
      F101_FO = 0;
    let F102_MO = 0,
      F102_FO = 0;

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

    const fDiagnosisclinic = await prisma.clinic.groupBy({
      by: ["patient_id"],
      where: {
        clinc_data: {
          gte: new Date(start_date),
          lte: new Date(end_date),
        },
        status: "Attend",
      },
      _count: {
        patient_id: true,
      },
    });

    const oldDiagnosis = fDiagnosisclinic
      .filter((group) => group._count.patient_id != 1)
      .map((group) => group.patient_id);

    const fristDiagnosis = fDiagnosisclinic
      .filter((group) => group._count.patient_id === 1)
      .map((group) => group.patient_id);

    const fristvistlist = await prisma.patients.groupBy({
      by: ["diagonsis", "gender"],
      where: {
        id: {
          in: fristDiagnosis,
        },
        diagonsis: {
          not: "",
        },
      },
      _count: {
        id: true,
      },
    });

    const oldvistlist = await prisma.patients.groupBy({
      by: ["diagonsis", "gender"],
      where: {
        id: {
          in: oldDiagnosis,
        },
        diagonsis: {
          not: "",
        },
      },
      _count: {
        id: true,
      },
    });

    fristvistlist.forEach((group) => {
      switch (group.diagonsis) {
        case "Dementia":
          if (group.gender === "male") {
            F00_MF = group._count.id; // Male count for Dementia
          } else {
            F00_FF = group._count.id; // Female count for Dementia
          }
          break;

        case "Delirium":
          if (group.gender === "male") {
            F05_MF = group._count.id; // Male count for Delirium
          } else {
            F05_FF = group._count.id; // Female count for Delirium
          }
          break;

        case "Other mental disorders due to brain damage":
          if (group.gender === "male") {
            F06_MF = group._count.id; // Male count for Other mental disorders due to brain damage
          } else {
            F06_FF = group._count.id; // Female count for Other mental disorders due to brain damage
          }
          break;

        case "Mental and behavioural disorders due to use of Alcohol":
          if (group.gender === "male") {
            F10_MF = group._count.id; // Male count for Mental and behavioural disorders due to use of Alcohol
          } else {
            F10_FF = group._count.id; // Female count for Mental and behavioural disorders due to use of Alcohol
          }
          break;

        case "Mental and behavioural disorders due to use of Opioids":
          if (group.gender === "male") {
            F11_MF = group._count.id; // Male count for Mental and behavioural disorders due to use of Opioids
          } else {
            F11_FF = group._count.id; // Female count for Mental and behavioural disorders due to use of Opioids
          }
          break;

        case "Mental and behavioural disorders due to use of Cannabinoids":
          if (group.gender === "male") {
            F12_MF = group._count.id; // Male count for Mental and behavioural disorders due to use of Cannabinoids
          } else {
            F12_FF = group._count.id; // Female count for Mental and behavioural disorders due to use of Cannabinoids
          }
          break;

        case "Mental and behavioural disorders due to use of Sedatives/Hypnotics":
          if (group.gender === "male") {
            F13_MF = group._count.id; // Male count for Mental and behavioural disorders due to use of Sedatives/Hypnotics
          } else {
            F13_FF = group._count.id; // Female count for Mental and behavioural disorders due to use of Sedatives/Hypnotics
          }
          break;

        case "Mental and behavioural disorders due to use of Tobacco":
          if (group.gender === "male") {
            F17_MF = group._count.id; // Male count for Mental and behavioural disorders due to use of Tobacco
          } else {
            F17_FF = group._count.id; // Female count for Mental and behavioural disorders due to use of Tobacco
          }
          break;

        case "Schizophrenia":
          if (group.gender === "male") {
            F20_MF = group._count.id; // Male count for Schizophrenia
          } else {
            F20_FF = group._count.id; // Female count for Schizophrenia
          }
          break;

        case "Delusional disorders":
          if (group.gender === "male") {
            F22_MF = group._count.id; // Male count for Delusional disorders
          } else {
            F22_FF = group._count.id; // Female count for Delusional disorders
          }
          break;

        case "Acute and transient psychotic disorders":
          if (group.gender === "male") {
            F23_MF = group._count.id; // Male count for Acute and transient psychotic disorders
          } else {
            F23_FF = group._count.id; // Female count for Acute and transient psychotic disorders
          }
          break;

        case "Schizoaffective disorders":
          if (group.gender === "male") {
            F25_MF = group._count.id; // Male count for Schizoaffective disorders
          } else {
            F25_FF = group._count.id; // Female count for Schizoaffective disorders
          }
          break;

        case "Manic episode / Bipolar affective disorder":
          if (group.gender === "male") {
            F30_MF = group._count.id; // Male count for Manic episode / Bipolar affective disorder
          } else {
            F30_FF = group._count.id; // Female count for Manic episode / Bipolar affective disorder
          }
          break;

        case "Depressive episode / Recurrent depressive disorder":
          if (group.gender === "male") {
            F32_MF = group._count.id; // Male count for Depressive episode / Recurrent depressive disorder
          } else {
            F32_FF = group._count.id; // Female count for Depressive episode / Recurrent depressive disorder
          }
          break;

        case "Anxiety disorders":
          if (group.gender === "male") {
            F40_MF = group._count.id; // Male count for Anxiety disorders
          } else {
            F40_FF = group._count.id; // Female count for Anxiety disorders
          }
          break;

        case "Obsessive compulsive disorders":
          if (group.gender === "male") {
            F42_MF = group._count.id; // Male count for Obsessive compulsive disorders
          } else {
            F42_FF = group._count.id; // Female count for Obsessive compulsive disorders
          }
          break;

        case "Reaction to severe stress and adjustment disorders":
          if (group.gender === "male") {
            F43_MF = group._count.id; // Male count for Reaction to severe stress and adjustment disorders
          } else {
            F43_FF = group._count.id; // Female count for Reaction to severe stress and adjustment disorders
          }
          break;

        case "Dissociative (conversion) disorder":
          if (group.gender === "male") {
            F44_MF = group._count.id; // Male count for Dissociative (conversion) disorder
          } else {
            F44_FF = group._count.id; // Female count for Dissociative (conversion) disorder
          }
          break;

        case "Somatoform disorders":
          if (group.gender === "male") {
            F45_MF = group._count.id; // Male count for Somatoform disorders
          } else {
            F45_FF = group._count.id; // Female count for Somatoform disorders
          }
          break;

        case "Eating disorders":
          if (group.gender === "male") {
            F50_MF = group._count.id; // Male count for Eating disorders
          } else {
            F50_FF = group._count.id; // Female count for Eating disorders
          }
          break;

        case "Sexual disorders":
          if (group.gender === "male") {
            F52_MF = group._count.id; // Male count for Sexual disorders
          } else {
            F52_FF = group._count.id; // Female count for Sexual disorders
          }
          break;

        case "Pregnancy related mental disorders":
          if (group.gender === "male") {
            // Skip as no male count exists for this
          } else {
            F53_FF = group._count.id; // Female count for Pregnancy related mental disorders
          }
          break;

        case "Personality disorders":
          if (group.gender === "male") {
            F60_MF = group._count.id; // Male count for Personality disorders
          } else {
            F60_FF = group._count.id; // Female count for Personality disorders
          }
          break;

        case "Gender identity disorders":
          if (group.gender === "male") {
            F64_MF = group._count.id; // Male count for Gender identity disorders
          } else {
            F64_FF = group._count.id; // Female count for Gender identity disorders
          }
          break;

        case "Mental retardation":
          if (group.gender === "male") {
            F70_MF = group._count.id; // Male count for Mental retardation
          } else {
            F70_FF = group._count.id; // Female count for Mental retardation
          }
          break;

        case "Speech and language disorders":
          if (group.gender === "male") {
            F80_MF = group._count.id; // Male count for Speech and language disorders
          } else {
            F80_FF = group._count.id; // Female count for Speech and language disorders
          }
          break;

        case "Specific development disorders of scholastic skills":
          if (group.gender === "male") {
            F81_MF = group._count.id; // Male count for Specific development disorders of scholastic skills
          } else {
            F81_FF = group._count.id; // Female count for Specific development disorders of scholastic skills
          }
          break;

        case "PDD including Autism":
          if (group.gender === "male") {
            F84_MF = group._count.id; // Male count for PDD including Autism
          } else {
            F84_FF = group._count.id; // Female count for PDD including Autism
          }
          break;

        case "ADHD":
          if (group.gender === "male") {
            F90_MF = group._count.id; // Male count for ADHD
          } else {
            F90_FF = group._count.id; // Female count for ADHD
          }
          break;

        case "Conduct disorder":
          if (group.gender === "male") {
            F91_MF = group._count.id; // Male count for Conduct disorder
          } else {
            F91_FF = group._count.id; // Female count for Conduct disorder
          }
          break;

        case "Emotional disorders with onset specific to childhood":
          if (group.gender === "male") {
            F93_MF = group._count.id; // Male count for Emotional disorders with onset specific to childhood
          } else {
            F93_FF = group._count.id; // Female count for Emotional disorders with onset specific to childhood
          }
          break;

        case "Disorders of social functioning":
          if (group.gender === "male") {
            F94_MF = group._count.id; // Male count for Disorders of social functioning
          } else {
            F94_FF = group._count.id; // Female count for Disorders of social functioning
          }
          break;

        case "Tic disorders":
          if (group.gender === "male") {
            F95_MF = group._count.id; // Male count for Tic disorders
          } else {
            F95_FF = group._count.id; // Female count for Tic disorders
          }
          break;

        case "Other behavioural and emotional disorders":
          if (group.gender === "male") {
            F98_MF = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F98_FF = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;

        case "Epilepsy":
          if (group.gender === "male") {
            F100_MF = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F100_FF = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;

        case "Other":
          if (group.gender === "male") {
            F101_MF = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F101_FF = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;

        case "No psychiatric illness":
          if (group.gender === "male") {
            F102_MF = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F102_FF = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;
        default:
          break;
      }
    });

    oldvistlist.forEach((group) => {
      switch (group.diagonsis) {
        case "Dementia":
          if (group.gender === "male") {
            F00_MO = group._count.id; // Male count for Dementia
          } else {
            F00_FO = group._count.id; // Female count for Dementia
          }
          break;

        case "Delirium":
          if (group.gender === "male") {
            F05_MO = group._count.id; // Male count for Delirium
          } else {
            F05_FO = group._count.id; // Female count for Delirium
          }
          break;

        case "Other mental disorders due to brain damage":
          if (group.gender === "male") {
            F06_MO = group._count.id; // Male count for Other mental disorders due to brain damage
          } else {
            F06_FO = group._count.id; // Female count for Other mental disorders due to brain damage
          }
          break;

        case "Mental and behavioural disorders due to use of Alcohol":
          if (group.gender === "male") {
            F10_MO = group._count.id; // Male count for Mental and behavioural disorders due to use of Alcohol
          } else {
            F10_FO = group._count.id; // Female count for Mental and behavioural disorders due to use of Alcohol
          }
          break;

        case "Mental and behavioural disorders due to use of Opioids":
          if (group.gender === "male") {
            F11_MO = group._count.id; // Male count for Mental and behavioural disorders due to use of Opioids
          } else {
            F11_FO = group._count.id; // Female count for Mental and behavioural disorders due to use of Opioids
          }
          break;

        case "Mental and behavioural disorders due to use of Cannabinoids":
          if (group.gender === "male") {
            F12_MO = group._count.id; // Male count for Mental and behavioural disorders due to use of Cannabinoids
          } else {
            F12_FO = group._count.id; // Female count for Mental and behavioural disorders due to use of Cannabinoids
          }
          break;

        case "Mental and behavioural disorders due to use of Sedatives/Hypnotics":
          if (group.gender === "male") {
            F13_MO = group._count.id; // Male count for Mental and behavioural disorders due to use of Sedatives/Hypnotics
          } else {
            F13_FO = group._count.id; // Female count for Mental and behavioural disorders due to use of Sedatives/Hypnotics
          }
          break;

        case "Mental and behavioural disorders due to use of Tobacco":
          if (group.gender === "male") {
            F17_MO = group._count.id; // Male count for Mental and behavioural disorders due to use of Tobacco
          } else {
            F17_FO = group._count.id; // Female count for Mental and behavioural disorders due to use of Tobacco
          }
          break;

        case "Schizophrenia":
          if (group.gender === "male") {
            F20_MO = group._count.id; // Male count for Schizophrenia
          } else {
            F20_FO = group._count.id; // Female count for Schizophrenia
          }
          break;

        case "Delusional disorders":
          if (group.gender === "male") {
            F22_MO = group._count.id; // Male count for Delusional disorders
          } else {
            F22_FO = group._count.id; // Female count for Delusional disorders
          }
          break;

        case "Acute and transient psychotic disorders":
          if (group.gender === "male") {
            F23_MO = group._count.id; // Male count for Acute and transient psychotic disorders
          } else {
            F23_FO = group._count.id; // Female count for Acute and transient psychotic disorders
          }
          break;

        case "Schizoaffective disorders":
          if (group.gender === "male") {
            F25_MO = group._count.id; // Male count for Schizoaffective disorders
          } else {
            F25_FO = group._count.id; // Female count for Schizoaffective disorders
          }
          break;

        case "Manic episode / Bipolar affective disorder":
          if (group.gender === "male") {
            F30_MO = group._count.id; // Male count for Manic episode / Bipolar affective disorder
          } else {
            F30_FO = group._count.id; // Female count for Manic episode / Bipolar affective disorder
          }
          break;

        case "Depressive episode / Recurrent depressive disorder":
          if (group.gender === "male") {
            F32_MO = group._count.id; // Male count for Depressive episode / Recurrent depressive disorder
          } else {
            F32_FO = group._count.id; // Female count for Depressive episode / Recurrent depressive disorder
          }
          break;

        case "Anxiety disorders":
          if (group.gender === "male") {
            F40_MO = group._count.id; // Male count for Anxiety disorders
          } else {
            F40_FO = group._count.id; // Female count for Anxiety disorders
          }
          break;

        case "Obsessive compulsive disorders":
          if (group.gender === "male") {
            F42_MO = group._count.id; // Male count for Obsessive compulsive disorders
          } else {
            F42_FO = group._count.id; // Female count for Obsessive compulsive disorders
          }
          break;

        case "Reaction to severe stress and adjustment disorders":
          if (group.gender === "male") {
            F43_MO = group._count.id; // Male count for Reaction to severe stress and adjustment disorders
          } else {
            F43_FO = group._count.id; // Female count for Reaction to severe stress and adjustment disorders
          }
          break;

        case "Dissociative (conversion) disorder":
          if (group.gender === "male") {
            F44_MO = group._count.id; // Male count for Dissociative (conversion) disorder
          } else {
            F44_FO = group._count.id; // Female count for Dissociative (conversion) disorder
          }
          break;

        case "Somatoform disorders":
          if (group.gender === "male") {
            F45_MO = group._count.id; // Male count for Somatoform disorders
          } else {
            F45_FO = group._count.id; // Female count for Somatoform disorders
          }
          break;

        case "Eating disorders":
          if (group.gender === "male") {
            F50_MO = group._count.id; // Male count for Eating disorders
          } else {
            F50_FO = group._count.id; // Female count for Eating disorders
          }
          break;

        case "Sexual disorders":
          if (group.gender === "male") {
            F52_MO = group._count.id; // Male count for Sexual disorders
          } else {
            F52_FO = group._count.id; // Female count for Sexual disorders
          }
          break;

        case "Pregnancy related mental disorders":
          if (group.gender === "male") {
            // Skip as no male count exists for this
          } else {
            F53_FO = group._count.id; // Female count for Pregnancy related mental disorders
          }
          break;

        case "Personality disorders":
          if (group.gender === "male") {
            F60_MO = group._count.id; // Male count for Personality disorders
          } else {
            F60_FO = group._count.id; // Female count for Personality disorders
          }
          break;

        case "Gender identity disorders":
          if (group.gender === "male") {
            F64_MO = group._count.id; // Male count for Gender identity disorders
          } else {
            F64_FO = group._count.id; // Female count for Gender identity disorders
          }
          break;

        case "Mental retardation":
          if (group.gender === "male") {
            F70_MO = group._count.id; // Male count for Mental retardation
          } else {
            F70_FO = group._count.id; // Female count for Mental retardation
          }
          break;

        case "Speech and language disorders":
          if (group.gender === "male") {
            F80_MO = group._count.id; // Male count for Speech and language disorders
          } else {
            F80_FO = group._count.id; // Female count for Speech and language disorders
          }
          break;

        case "Specific development disorders of scholastic skills":
          if (group.gender === "male") {
            F81_MO = group._count.id; // Male count for Specific development disorders of scholastic skills
          } else {
            F81_FO = group._count.id; // Female count for Specific development disorders of scholastic skills
          }
          break;

        case "PDD including Autism":
          if (group.gender === "male") {
            F84_MO = group._count.id; // Male count for PDD including Autism
          } else {
            F84_FO = group._count.id; // Female count for PDD including Autism
          }
          break;

        case "ADHD":
          if (group.gender === "male") {
            F90_MO = group._count.id; // Male count for ADHD
          } else {
            F90_FO = group._count.id; // Female count for ADHD
          }
          break;

        case "Conduct disorder":
          if (group.gender === "male") {
            F91_MO = group._count.id; // Male count for Conduct disorder
          } else {
            F91_FO = group._count.id; // Female count for Conduct disorder
          }
          break;

        case "Emotional disorders with onset specific to childhood":
          if (group.gender === "male") {
            F93_MO = group._count.id; // Male count for Emotional disorders with onset specific to childhood
          } else {
            F93_FO = group._count.id; // Female count for Emotional disorders with onset specific to childhood
          }
          break;

        case "Disorders of social functioning":
          if (group.gender === "male") {
            F94_MO = group._count.id; // Male count for Disorders of social functioning
          } else {
            F94_FO = group._count.id; // Female count for Disorders of social functioning
          }
          break;

        case "Tic disorders":
          if (group.gender === "male") {
            F95_MO = group._count.id; // Male count for Tic disorders
          } else {
            F95_FO = group._count.id; // Female count for Tic disorders
          }
          break;

        case "Other behavioural and emotional disorders":
          if (group.gender === "male") {
            F98_MO = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F98_FO = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;

        case "Epilepsy":
          if (group.gender === "male") {
            F100_MO = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F100_FO = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;

        case "Other":
          if (group.gender === "male") {
            F101_MO = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F101_FO = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;

        case "No psychiatric illness":
          if (group.gender === "male") {
            F102_MO = group._count.id; // Male count for Other behavioural and emotional disorders
          } else {
            F102_FO = group._count.id; // Female count for Other behavioural and emotional disorders
          }
          break;
        default:
          break;
      }
    });

    return NextResponse.json(
      {
        data: {

            date,
          //clinic session
          c_general,
          c_child,
          c_substance,
          c_gender,
          c_elderly,
          c_other,

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

          //Diagnosis
          //frist time
          F00_MF,
          F00_FF,
          F05_MF,
          F05_FF,
          F06_MF,
          F06_FF,
          F10_MF,
          F10_FF,
          F11_MF,
          F11_FF,
          F12_MF,
          F12_FF,
          F13_MF,
          F13_FF,
          F17_MF,
          F17_FF,
          F20_MF,
          F20_FF,
          F22_MF,
          F22_FF,
          F23_MF,
          F23_FF,
          F25_MF,
          F25_FF,
          F30_MF,
          F30_FF,
          F32_MF,
          F32_FF,
          F40_MF,
          F40_FF,
          F42_MF,
          F42_FF,
          F43_MF,
          F43_FF,
          F44_MF,
          F44_FF,
          F45_MF,
          F45_FF,
          F50_MF,
          F50_FF,
          F52_MF,
          F52_FF,
          F53_FF,
          F60_MF,
          F60_FF,
          F64_MF,
          F64_FF,
          F70_MF,
          F70_FF,
          F80_MF,
          F80_FF,
          F81_MF,
          F81_FF,
          F84_MF,
          F84_FF,
          F90_MF,
          F90_FF,
          F91_MF,
          F91_FF,
          F93_MF,
          F93_FF,
          F94_MF,
          F94_FF,
          F95_MF,
          F95_FF,
          F98_MF,
          F98_FF,
          F100_MF,
          F100_FF,
          F101_MF,
          F101_FF,
          F102_MF,
          F102_FF,

          //old oldvistlist
          F00_MO,
          F00_FO,
          F05_MO,
          F05_FO,
          F06_MO,
          F06_FO,
          F10_MO,
          F10_FO,
          F11_MO,
          F11_FO,
          F12_MO,
          F12_FO,
          F13_MO,
          F13_FO,
          F17_MO,
          F17_FO,
          F20_MO,
          F20_FO,
          F22_MO,
          F22_FO,
          F23_MO,
          F23_FO,
          F25_MO,
          F25_FO,
          F30_MO,
          F30_FO,
          F32_MO,
          F32_FO,
          F40_MO,
          F40_FO,
          F42_MO,
          F42_FO,
          F43_MO,
          F43_FO,
          F44_MO,
          F44_FO,
          F45_MO,
          F45_FO,
          F50_MO,
          F50_FO,
          F52_MO,
          F52_FO,
          F53_FO,
          F60_MO,
          F60_FO,
          F64_MO,
          F64_FO,
          F70_MO,
          F70_FO,
          F80_MO,
          F80_FO,
          F81_MO,
          F81_FO,
          F84_MO,
          F84_FO,
          F90_MO,
          F90_FO,
          F91_MO,
          F91_FO,
          F93_MO,
          F93_FO,
          F94_MO,
          F94_FO,
          F95_MO,
          F95_FO,
          F98_MO,
          F98_FO,
          F100_MO,
          F100_FO,
          F101_MO,
          F101_FO,
          F102_MO,
          F102_FO,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
