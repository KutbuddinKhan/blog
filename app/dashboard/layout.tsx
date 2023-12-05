import React, { ReactNode } from 'react'
import NavLinks from './components/NavLinks'

export default function layout({children} : {children: ReactNode}) {
  return (
    <div>
        <NavLinks />
      {children}
    </div>
  )
}
