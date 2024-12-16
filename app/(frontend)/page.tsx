'use client'
// app/Page.tsx

import Image from 'next/image'

import P from '@/components/p'

export default function Home() {
  return (
    <section className='flex flex-col gap-16 py-8 md:py-10'>
      {/* Landing Section */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 '>
        {/* Left Column: Image */}
        <div className='col-span-1'>
          <div className='relative w-full aspect-[4/3]'>
            <Image
              fill
              alt='Landing Page Image'
              className='absolute inset-0 object-cover'
              src='/JordanPlantStore.jpg'
            />
          </div>
        </div>
        {/* Right Column: Copy */}
        <div className='col-span-1 bg-light-500'>
          <P>
            Hi, I&apos;m Jordan Lambrecht, a Professional Something or Another
            based out of Lincoln, Nebraska.
          </P>

          <P>
            Creating well-designed and personal moments that make people happy
            gets me out of bed in the morning - and keeps me up at night. As
            such, an off button is not part of my programming, be it with
            animation, web development, or any other outlet that involves making
            something exist that didn&apos;t before. When I&apos;m not staringt
            a at a computer, I&apos;m probably building something, killing
            plants, or shitty pots.
          </P>

          <P>
            I&apos;m the Director and Founder of Pixel Bakery Design Studio and
            sit on the Board of Directors for the Lux Center for the Arts.
            Sometimes I host workshops, create tutorials, and do some public
            speaking.
          </P>

          <P>
            I give credence to the idea that the critical components of a
            greater creative community are vulnerability, de-stigmatization of
            mental health, and equity.
          </P>

          <P>
            I believe in free and open education, treating human beings like
            humans, and empowering those not as far along on their journey as I
            am.
          </P>

          <P>I believe in you. ❤️</P>
        </div>
      </div>
    </section>
  )
}
