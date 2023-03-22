import React from 'react'
import clsx from 'clsx'

type Props = {
  label: string,
  onClick: () => void,
  className?: string
}

export default function Button({
  label,
  onClick,
  className
}: Props) {
  return (
    <button 
      onClick={onClick} 
      className={clsx('bg-[#4BA6E2] text-base text-white p-[5px] focus-within:outline-none w-full', className)}
    >
      {label}
    </button>
  )
}