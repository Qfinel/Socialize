'use client'

import React from 'react'
import Image from 'next/image'
// import { useSession } from "next-auth/react";

const Contact = () => {
  return (
    <div className='w-full flex
      items-center cursor-pointer'>
      <div className='w-[50px] h-[50px] 
          relative mr-4'>
        <Image 
          src="/cat.jpg"
          alt="John Doe"
          fill
          className='object-cover rounded-full'
          />
      </div>
        <h1 className='text-white/90 text-base'>
          John Doe
        </h1>
    </div>
  )
}

const Contacts = () => {

  // const { data: session } = useSession();

  return (
    <section className='section-container h-[420px] p-8'>
      <header className='flex justify-between
        items-end mb-10'>
        <h1 className='text-white
          font-bold text-3xl'>
          Contacts
        </h1>
      </header>
      <main className='flex flex-col gap-6'>
        {/* {session ? (
          <> 
            <Contact />
            <Contact /> 
          </>
        ) : (
          <p className='text-white/90'>
          Not logged in
          </p>
        )} */}
        <p className='text-white/90'>
          You don't have contacts yet
        </p>
      </main>
    </section>
  )
}

export default Contacts