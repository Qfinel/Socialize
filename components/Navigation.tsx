'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

interface MenuButtonProps {
  icon: string,
  title: string
}

const MenuButton = ({icon, title}: MenuButtonProps) => {
  return (
    <div className='flex w-full transition
      duration-300 hover:bg-white/20
      cursor-pointer items-center
      justify-start py-4 px-4 rounded-[20px]'>
      <Image
        src={icon}
        alt={title}
        width={25}
        height={25}
        className='mr-4'/>
      <p className='text-white/90 text-base'>
        {title}
      </p>
    </div>
  )
}

const Navigation = () => {

  // const {data: session} = useSession()
  const [openBtn, setOpenBtn] = useState<boolean>(false)

  return (
    <section className='section-container
       h-[420px]'>
      <header className='flex justify-between
        items-end mb-10 px-8 pt-8'>
        <h1 className='text-white
          font-bold text-3xl'>
          Socialize
        </h1>
        {/* {session && ( */}
        {openBtn &&
              (<button
                className='relative
                  text-white/90 bg-white/10
                  px-4 py-2 rounded-[20px]
                  transition duration-300
                  hover:bg-white/30'
                onClick={() => {signOut()}}>
                Log Out
              </button>)}
          <button className='w-[40px] h-[40px]
            bg-white/20 rounded-full
            flex items-center justify-center
            hover:bg-white/30 transition
            duration-300'
            onClick={() => setOpenBtn(!openBtn)}>
            <Image 
              src="/three-dots.svg"
              alt="three dots"
              width={25}
              height={25}/>
          </button>

        {/* )} */}
      </header>
      {/* {session ? ( */}
        <main className='flex flex-col gap-2 px-4'>
         
          <MenuButton icon="/people.svg" title="Friends" />
          <MenuButton icon="/shop.svg" title="Marketplace" />
          <MenuButton icon="/collection.svg" title="Groups" />
          <MenuButton icon="/play-btn.svg" title="Watch" />
        </main>
      {/*  ) : (
         <p className='text-white/90 ml-8'>Not Logged In</p>
       )} */}
    </section>
  )
}

export default Navigation