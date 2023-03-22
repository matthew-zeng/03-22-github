import React from 'react'
import clsx from 'clsx'

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  className?: string,
  placeholder?: string
}

export default function Input({
  onChange,
  value,
  className = '',
  placeholder = 'username'
}: Props) {
  return (
    <input 
      value={value}
      placeholder={placeholder} 
      onChange={onChange} 
      className={clsx('bg-[#F4F4F4] text-base text-[#3E3E3E] border border-[EAEAEA] p-[5px] focus-within:outline-none', className)}
    />
  )
}