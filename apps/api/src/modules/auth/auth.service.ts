import { prisma } from '@repo/database'

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      systemRole: true,
    },
  })

  if (!user) {
    throw new Error('User not found.')
  }

  return user
}
