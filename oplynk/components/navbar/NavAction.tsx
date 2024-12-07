"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import NavLinks from './NavLinks'
import useSignUpModal from '@/hooks/useSignUpModal';
import useSignInModal from '@/hooks/useSignInModal';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/actions/user.actions';

interface NavActionProps {
    loggedIn: boolean | null;
}

const NavAction: React.FC<NavActionProps> = (
    { loggedIn }
) => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const signUpModal = useSignUpModal()
    const signInModal = useSignInModal()

    const handleLogout = () => {
        console.log('logout')
        logout()
        router.push('/')
    }

    return (
        <div className="border flex justify-center items-center p-2 rounded-full space-x-1 ">
            <Image
                src="/assets/icons/profile.png"
                alt="profile"
                width={24}
                height={24}
            />
            <Image
                src="/assets/icons/menu.png"
                alt="menu"
                width={18}
                height={18}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className='absolute w-[160px] bg-white border-t-2 rounded-b-md top-[58px] right-0 flex flex-col items-center shadow-lg'>
                    {loggedIn ? (
                    <div>
                        <div className='lg:hidden'>
                            <NavLinks label="Sessions" onClick={() => console.log(userId)} />
                            <NavLinks label="Gifts Library" onClick={() => console.log(userId)} />
                        </div>
                        <NavLinks label="Logout" onClick={handleLogout} />
                    </div>
                    ) : (
                    <div>
                        <NavLinks label="Sign In" onClick={ () => {
                            signInModal.open()
                            setIsOpen(false)
                        }} />
                        <NavLinks label="Sign Up" onClick={ () => {
                            signUpModal.open()
                            setIsOpen(false)
                        }} />
                    </div>
                    )}
                </div>
            )}
        </div>

    )
}

export default NavAction
