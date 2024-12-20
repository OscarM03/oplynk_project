
import Image from 'next/image';
import React, { useState } from 'react'
import { createSession } from '@/lib/actions/session.actions';
import { set } from 'date-fns';

interface sessionFormProps {
    type: string;
    closeForm: () => void;
    setSession: (session: any) => void;
}
const SessionForm: React.FC<sessionFormProps> = (
    { type, closeForm, setSession }
) => {
    const [sessionTitle, setSessionTitle] = useState('')
    const [sessionCategory, setSessionCategory] = useState('')
    const [sessionDescription, setSessionDescription] = useState('')
    const [target, setTarget] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = {
            title: sessionTitle,
            category: sessionCategory,
            description: sessionDescription,
            target,
        }
        try {
            const session = await createSession(formData)
            console.log("New session", session)
            if (session.$id) {
                setSession(session)
                closeForm()
            }

        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex-center bg-black/60 fixed inset-0 z-50">
            <div className='flex flex-col items-center border rounded-lg bg-white w-[90%] md:w-[80%] lg:w-[500px] h-auto relative'>
                <div className='bg w-full py-4 rounded-t-lg text-center font-bold'>
                    <h2 className="text-white cursor-pointer  text-xl">Create Session</h2>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4 p-4 w-full'>
                    <input type='text' placeholder='Enter Your Session Title' onChange={(e) => setSessionTitle(e.target.value)} className='form-input' />
                    <input type='text' placeholder='Enter Your Session Category' onChange={(e) => setSessionCategory(e.target.value)} className='form-input' />
                    {type === 'group-fund' && (
                        <input type='number' placeholder='Enter Your Traget Amount' onChange={(e) => setTarget(parseInt(e.target.value) || 0)} className='form-input' />
                    )}
                    <textarea placeholder='Enter Your Session Description' onChange={(e) => setSessionDescription(e.target.value)} className='form-input'></textarea>

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
                </form>
                <div className='absolute right-0 top-0' onClick={closeForm}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default SessionForm
