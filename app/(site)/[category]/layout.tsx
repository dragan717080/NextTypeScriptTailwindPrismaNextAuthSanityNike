export const metadata = {
  title: 'Dragan',
  description: 'Sports wear website built with Next.js, Three.js, TypeScript, Tailwind, MongoDB, NextAuth.js, Prisma, Zustand, FramerMotion and Sanity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
