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
    user: any | null
}

const NavAction: React.FC<NavActionProps> = (
    { loggedIn, user }
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

    const handleProfileClick = () => {
        if (loggedIn) {
            router.push(`/profile/${user.$id}`);
        } else {
            signInModal.open();
        }
    }

    return (
        <div className="border flex justify-center items-center p-2 rounded-full space-x-1 ">
            <Image
                src="/assets/icons/profile.png"
                alt="profile"
                width={24}
                height={24}
                onClick={handleProfileClick}
            />
            <Image
                src="/assets/icons/menu.png"
                alt="menu"
                width={18}
                height={18}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className='absolute w-[160px] bg-white border-t-2 rounded-b-md top-[58px] right-0 flex flex-col items-center shadow-lg z-50'>
                    {loggedIn ? (
                    <div>
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
