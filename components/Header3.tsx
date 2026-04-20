import React from 'react'

type Props = {
    children: React.ReactNode
}

const Header3 = ({ children }: Props) => {
  return (
    <h3 className="text-xl font-semibold">{children}</h3>
  )
}

export default Header3