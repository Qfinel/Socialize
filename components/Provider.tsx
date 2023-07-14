'use client'

import React from 'react'
import { RootProps } from '@/app/layout'
import { SessionProvider } from 'next-auth/react'

const Provider = ({children, session}: RootProps) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider