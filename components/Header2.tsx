import React from 'react'

type Props = {
    children: React.ReactNode
}

const Header2 = ({ children }: Props) => {
  return (
    <h2 className="text-2xl font-bold">{children}</h2>
  )
}

export default Header2