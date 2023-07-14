'use client'

import { submitPost } from '@/services'
import React, { FormEvent, useRef } from 'react'
// import { useSession, signIn } from "next-auth/react"

const NewPost = () => {
  
  // const {data: session} = useSession()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmitPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitPost({content: inputRef.current?.value as string,
      email: 'jfrimg@proton.me'})
    
    if (inputRef.current)
      inputRef.current.value = ""
  }
  
  return (
    <section className='section-container h-[200px]
      flex items-center justify-center p-8'>
      {/* {session ? ( */}
        <form className='h-full w-full flex flex-col
          items-center justify-between gap-8'
          onSubmit={handleSubmitPost}>
        <input className='h-[60px] w-full
          rounded-full px-8 outline-none
          bg-black/10 text-white placeholder:text-white/30'
          placeholder="What's on your mind..."
          ref={inputRef}/>
        <button type='submit'
          className='w-[150px] bg-blue-400
            rounded-full text-white h-[40px]
            font-bold transition duration-300
            hover:bg-white/90 hover:text-blue-400'>
            Post
        </button>
      </form>
      {/* ) : (
        <button className='bg-blue-400
          rounded-full text-white h-[40px]
          w-[120px] font-bold transition duration-300
          hover:bg-white/90 hover:text-blue-400'
          onClick={() => signIn()}>
          Sign In
        </button>
      )} */}
    </section>
  )
}

export default NewPost