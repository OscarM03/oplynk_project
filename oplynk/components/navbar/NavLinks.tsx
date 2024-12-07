"use client";

import React from 'react'

interface NavLinkProps {
    label: string;
    onClick: () => void;
}

const NavLinks: React.FC<NavLinkProps> = ({label, onClick}) => {
  return (
    <div onClick={onClick} className='py-3 px-6 border-b cursor-pointer text-gray-700 text-center font-medium'>
        {label}
    </div>
  )
}

export default NavLinks
