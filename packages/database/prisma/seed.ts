import { PrismaClient, SystemRole } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Verificamos se o utilizador Super Admin já existe para evitar duplicados.
  const superAdmin = await prisma.user.findUnique({
    where: { email: 'admin@q-ordo.com' },
  })

  if (superAdmin) {
    console.log('Super admin user already exists. Seeding skipped.')
    return
  }

  console.log('Seeding super admin user...')

  // Criptografamos uma senha padrão para o nosso admin.
  // Em produção, esta senha deve ser alterada ou gerada de forma segura.
  const passwordHash = await hash('12345678', 10)

  await prisma.user.create({
    data: {
      name: 'Q-Ordo Admin',
      email: 'admin@qordo.com',
      passwordHash,
      systemRole: SystemRole.SUPER_ADMIN,
    },
  })

  console.log('Super admin user created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
