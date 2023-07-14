'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPosts } from '@/services'
import { deletePost } from '@/services'

interface Comment {
  text: string;
  createdBy: {
    name: string;
    picture: string;
  }
}

export interface Post {
  content: string,
  author: string,
  createdAt: string,
  photo: string,
  likes?: number,
  comments: Comment[],
  fetchPosts?: () => void,
  id: string
}

const Post = (props: Post) => {

  const [openBtn, setOpenBtn] = useState<boolean>(false)

  const betterDate = props.createdAt.substring(0, 10);

  const handleDeletePost = async (post: Post) => {
    await deletePost(post.id)

    if (props.fetchPosts)
      props.fetchPosts()
  }

  return (
    <div className='p-8 w-full flex flex-col
      bg-white/10 rounded-[30px]'>
      <header className='w-full flex items-center
        justify-between mb-6'>
        <div className='flex'>
          <div className='w-[50px] h-[50px] 
              relative mr-4'>
            <Image 
              src={props.photo}
              alt={props.author}
              fill
              className='object-cover rounded-full'
            />
          </div>
          <div className='flex flex-col align-start justify-evenly'>
            <h1 className='text-white/90 text-lg'>
              {props.author}
            </h1>
            <p className='text-white/40 text-sm'>
              {betterDate}
            </p>
          </div>
        </div>
        <div className='flex items-center justify-between gap-2'>
          {openBtn &&
                (<button
                  className='relative
                    text-white/90 bg-white/10
                    px-4 py-2 rounded-[20px]
                    transition duration-300
                    hover:bg-white/30'
                  onClick={() => {handleDeletePost(props)}}>
                  Delete
              </button>)}
          <button className='w-[30px] h-[30px]
            bg-white/20 rounded-full
            flex items-center justify-center
            hover:bg-white/30 transition
            duration-300'
            onClick={() => setOpenBtn(!openBtn)}>
            <Image 
              src="/three-dots.svg"
              alt="three dots"
              width={20}
              height={20}/>
          </button>
        </div>
      </header>
      <main className='w-full flex flex-col'>
        <p className='text-white/80 text-base'>
          {props.content}
        </p>
      </main>
      <div className='w-full flex
        justify-between my-6'>
        <p className='text-white/50 text-[14px]
          cursor-pointer'>
          {props.likes} Likes
        </p>
        <p className='text-white/50 text-[14px]
          cursor-pointer'>
          {props.comments.length} Comments
        </p>
      </div>
      <footer className='w-full flex gap-4'>
        <button className='flex items-center
          justify-center hover:bg-blue-400
          w-[50px] h-[40px] rounded-[30px]
          text-white transition duration-300'
          type='button'>
          <Image 
            src="/like.svg"
            alt='like'
            width={20}
            height={20}/>
        </button>
        <form className='flex w-full items-center gap-4'>
          <input className='basis-4/5 outline-none
            rounded-[30px] bg-black/10 px-4 py-3
            text-white/90 placeholder:text-white/30
            text-sm'
            placeholder='Your comment here...' />
          <button className='flex items-center
            justify-center bg-blue-400
            w-[50%] h-[40px] rounded-[30px]
            text-white basis-1/5 transition
            duration-300 hover:bg-white hover:text-blue-400'
            type='submit'>
            Comment
          </button>
        </form>
      </footer>
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const result = await getPosts()

    const posts = result.map((item) => ({
      content: item.node.content,
      author: item.node.author.name,
      createdAt: item.node.createdAt,
      photo: item.node.author.photo.url,
      likes: item.node.likes,
      comments: item.node.comments,
      id: item.node.id
    }))

    setPosts(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section className='section-container
      flex flex-col h-[520px] p-8 gap-8
      overflow-y-scroll'>
      {posts.map((post) =>
        <Post
          key={post.id}
          author={post.author}
          photo={post.photo}
          content={post.content}
          createdAt={post.createdAt}
          likes={post.likes}
          comments={post.comments}
          fetchPosts={fetchPosts}
          id={post.id}
          />
      )}
    </section>
  )
}

export default Feed