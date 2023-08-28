import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    const password = "password123";
    const user = await prisma.user.upsert({
        where: { email: "seed@gamil.com" },
        update: {},
        create: {
            email: "seed@gamil.com",
            name: "seed",
            password,
            isVerified: false
        },
    });
    console.log({ user });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
