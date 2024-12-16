export default function ProductDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='justify-between inline-block w-full '>{children}</div>
    </section>
  )
}
