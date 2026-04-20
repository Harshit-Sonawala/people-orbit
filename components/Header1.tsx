import React from 'react'

type Props = {
    children: React.ReactNode
}

const Header1 = ({ children }: Props) => {
  return (
    <h1 className="text-3xl font-bold">{children}</h1>
  )
}

export default Header1