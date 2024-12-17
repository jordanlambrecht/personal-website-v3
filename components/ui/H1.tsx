// components/ui/H1.tsx

import React from 'react'
import { cn } from '@utilities/cn'

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  className?: string
}

const H1: React.FC<H1Props> = ({ children, className, ...props }) => {
  return (
    <h1
      className={cn('text-4xl font-bold leading-tight mb-2 md:mb-4', className)}
      {...props}
    >
      {children}
    </h1>
  )
}

export default H1
