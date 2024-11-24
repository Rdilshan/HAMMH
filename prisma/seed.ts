const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createData = async () => {
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
};

createData();
