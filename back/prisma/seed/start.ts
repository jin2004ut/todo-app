import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('💫 seed executing ...');
  await prisma.todo.deleteMany();
  await prisma.todo.create({
    data: {
      title: 'homework',
      content: '',
      deadline: '2024-11-15'
    },
  });
  console.log('💫 seed finished.');
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
});
