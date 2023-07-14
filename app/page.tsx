'use client'

import { Contacts, Feed, Navigation, NewPost } from "@/components";

export default function Home() {
  
  return (
    <main className="flex py-24 px-48 gap-8">
      <div className="flex basis-1/4 flex-col gap-6">
        <Navigation />
      </div>
      <div className="flex basis-1/2 flex-col gap-6">
        <NewPost />
        <Feed />
      </div>
      <div className="flex basis-1/4 flex-col">
        <Contacts />
      </div>
    </main>
  )
}
