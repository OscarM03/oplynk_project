"use client";

import React, { useState } from 'react'
import Modal from './Modal'
import useSignInModal from '@/hooks/useSignInModal'
import { SignInUser } from '@/lib/actions/user.actions';
import useSignUpModal from '@/hooks/useSignUpModal'
import Image from 'next/image';
import OTPModal from '../modals/OTPModal';

const LoginModal = () => {
    const signInModal = useSignInModal()
    const signUpModal = useSignUpModal()
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [accountId, setAccountId] = useState(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage('')

        try {
            const user = await SignInUser({ email })
            console.log("user", user)
            setAccountId(user.accountId)
            if (user.accountId == null) {
                setErrorMessage(user.error)
            } else {
                signInModal.close()
            }
        } catch (error) {
            setErrorMessage('Failed to sign in. Please try again')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignUpBtn = () => {
        signInModal.close()
        signUpModal.open()
    }

    const content = (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mb-4'>
                <input type="email" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} className='form-input' />

                {errorMessage && (
                    <div className='text-red-600 '>
                        *{errorMessage}
                    </div>
                )
                }

                <button className='btn flex justify-center' disabled={isLoading}>
                    Submit
                    {isLoading && (
                        <Image
                            src="/assets/icons/loader.svg"
                            alt="loader"
                            width={24}
                            height={24}
                            className="animate-spin ml-2"
                        />
                    )}
                </button>
                <h2 className='text-center text-gray-700 '>Don&apos;t have an account, <span className='text-lg text-dodger-blue font-medium cursor-pointer' onClick={handleSignUpBtn}>Sign Up</span></h2>
            </form>
        </>
    )
    return (
        <>
            <Modal
                label="Sign In"
                content={content}
                isOpen={signInModal.isOpen}
                close={signInModal.close}
            />
            {accountId && <OTPModal email={email} accountId={accountId} />}
        </>

    )
}

export default LoginModal