const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createData = async () => {
  try {
    await prisma.user.create({
      data: {
        name: "admin",
        email: "admin@gmail.com",
        password: "admin",
        role: "admin",
        telephone: "12345678",
        gender: "male",
      },
    });
    console.log("Super admin created");
  } catch (error) {
    console.error("Error creating super admin:", error);
  }
};

const diagnoses = [
  { name: "Dementia", Icd_code: "F00-F03" },
  { name: "Delirium", Icd_code: "F05" },
  { name: "Other mental disorders due to brain damage", Icd_code: "F06" },
  { name: "Mental and behavioural disorders due to use of Alcohol", Icd_code: "F10" },
  { name: "Mental and behavioural disorders due to use of Opioids", Icd_code: "F11" },
  { name: "Mental and behavioural disorders due to use of Cannabinoids", Icd_code: "F12" },
  { name: "Mental and behavioural disorders due to use of Sedatives/Hypnotics", Icd_code: "F13" },
  { name: "Mental and behavioural disorders due to use of Tobacco", Icd_code: "F17" },
  { name: "Schizophrenia", Icd_code: "F20" },
  { name: "Delusional disorders", Icd_code: "F22" },
  { name: "Acute and transient psychotic disorders", Icd_code: "F23" },
  { name: "Schizoaffective disorders", Icd_code: "F25" },
  { name: "Manic episode / Bipolar affective disorder", Icd_code: "F30, F31" },
  { name: "Depressive episode / Recurrent depressive disorder", Icd_code: "F32, F33" },
  { name: "Anxiety disorders (e.g., Phobia, GAD)", Icd_code: "F40, F41" },
  { name: "Obsessive compulsive disorders", Icd_code: "F42" },
  { name: "Reaction to severe stress and adjustment disorders", Icd_code: "F43" },
  { name: "Dissociative (conversion) disorder", Icd_code: "F44" },
  { name: "Somatoform disorders", Icd_code: "F45" },
  { name: "Eating disorders", Icd_code: "F50" },
  { name: "Sexual disorders", Icd_code: "F52" },
  { name: "Pregnancy related mental disorders", Icd_code: "F53" },
  { name: "Personality disorders", Icd_code: "F60" },
  { name: "Gender identity disorders", Icd_code: "F64" },
  { name: "Mental retardation", Icd_code: "F70-F79" },
  { name: "Speech and language disorders", Icd_code: "F80" },
  { name: "Specific development disorders of scholastic skills", Icd_code: "F81" },
  { name: "PDD including Autism", Icd_code: "F84" },
  { name: "ADHD", Icd_code: "F90" },
  { name: "Conduct disorder", Icd_code: "F91" },
  { name: "Emotional disorders with onset specific to childhood (e.g., separation anxiety, phobia, sibling rivalry)", Icd_code: "F93" },
  { name: "Disorders of social functioning with onset specific to childhood and adolescence (e.g., elective mutism, attachment disorders)", Icd_code: "F94" },
  { name: "Tic disorders", Icd_code: "F95" },
  { name: "Other behavioural and emotional disorders onset usually occurring in childhood and adolescence (e.g., enuresis, pica, encopresis, stammering)", Icd_code: "F98" },
  { name: "Epilepsy", Icd_code: null },
  { name: "Other", Icd_code: null },
  { name: "No psychiatric illness", Icd_code: null },
];

const Diagonsisdata = async () => {
const prisma = new PrismaClient();

  try {
    for (const diagnosis of diagnoses) {
      await prisma.diagonsis.create({
        data: diagnosis,
      });
    }
    console.log("Diagnosis data created");
  } catch (error) {
    console.error("Error creating diagnosis data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const main = async () => {
  await createData();
  await Diagonsisdata();
  await prisma.$disconnect(); // Close the Prisma client
};

main();
