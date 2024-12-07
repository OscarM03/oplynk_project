"use client";

import React, { useState } from 'react'
import Modal from './Modal'
import useSignUpModal from '@/hooks/useSignUpModal'
import useSignInModal from '@/hooks/useSignInModal'
import { createAccount } from '@/lib/actions/user.actions';
import OTPModal from '../modals/OTPModal';
import Image from 'next/image';

const SignUpModal = () => {
    const signUpModal = useSignUpModal()
    const signInModal = useSignInModal()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [accountId, setAccountId] = useState(null);
    // const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (!username || !email) {
            setErrorMessage('Please fill in all fields')
            return
        }

        setErrorMessage('')
        try {
            const user = await createAccount({ 
                username, email })
            setAccountId(user.accountId)
            console.log("user", user)
            signUpModal.close()
        } catch (error) {
            setErrorMessage('Failed to create account. Please try again')
        } finally {
            setIsLoading(false)
        }

    }

    const handleSignInBtn = () => {
        signUpModal.close()
        signInModal.open()
    }

    const content = (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mb-4'>
                <input type="text" placeholder='Enter your Username' onChange={(e) => setUsername(e.target.value)} className='form-input' />
                <input type="email" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} className='form-input' />

                {errorMessage && (
                    <div className='text-red-600 '>
                        *{errorMessage}
                    </div>
                )
                }
                {/* {successMessage && (
                    <div className='text-green-600'>
                        {successMessage}
                    </div>
                )} */}

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

                <h2 className='text-center text-gray-700 '>Already have an account, <span className='text-lg text-dodger-blue font-medium cursor-pointer' onClick={handleSignInBtn}>Sign In</span></h2>
            </form>

        </>
    )
    return (
        <>
            <Modal
                label="Sign Up"
                content={content}
                isOpen={signUpModal.isOpen}
                close={signUpModal.close}
            />
            {accountId && <OTPModal email={email} accountId={accountId} />}
        </>
    )
}

export default SignUpModal
