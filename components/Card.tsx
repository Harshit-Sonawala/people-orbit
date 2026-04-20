import React from 'react'

type Props = {
    children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-start justify-start rounded-md p-4 bg-surface">
        {children}
    </div>
  )
}

export default Card